import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb, adminStorage } from '@/lib/firebase-admin';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { ConfirmationEmail } from '@/emails/confirmation';
import { verifyTurnstile } from '@/lib/turnstile';

const ADMIN_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@ukgazete.com';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function generateReferenceNumber(): string {
  const prefix = 'ETA';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Upload a base64 image to Firebase Storage and return the public URL.
 */
async function uploadBase64Image(
  base64Data: string,
  path: string
): Promise<string> {
  const matches = base64Data.match(/^data:([^;]+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid base64 image data');
  }

  const contentType = matches[1];
  const buffer = Buffer.from(matches[2], 'base64');

  const bucket = adminStorage.bucket();
  const file = bucket.file(path);

  await file.save(buffer, {
    metadata: {
      contentType,
      cacheControl: 'public, max-age=31536000',
    },
  });

  await file.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${path}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData, paymentIntentId, turnstileToken } = body;

    // ── Turnstile verification ────────────────────────────────
    const turnstileResult = await verifyTurnstile(turnstileToken);
    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: turnstileResult.error },
        { status: 403 }
      );
    }

    // ── Validate required fields ──────────────────────────────
    if (!formData || !paymentIntentId) {
      return NextResponse.json(
        { error: 'Missing form data or payment ID' },
        { status: 400 }
      );
    }

    if (!formData.email || typeof formData.email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // ── Verify payment ────────────────────────────────────────
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment has not been completed' },
        { status: 400 }
      );
    }

    // ── Idempotency: prevent duplicate submissions ────────────
    const existingSnap = await adminDb
      .collection('eta-applications')
      .where('paymentIntentId', '==', paymentIntentId)
      .limit(1)
      .get();

    if (!existingSnap.empty) {
      const existing = existingSnap.docs[0].data();
      return NextResponse.json({
        success: true,
        referenceNumber: existing.referenceNumber,
        duplicate: true,
      });
    }

    const referenceNumber = generateReferenceNumber();
    const now = new Date().toISOString();

    // ── Upload photos ─────────────────────────────────────────
    const photoUrls: Record<string, string> = {};

    if (formData.selfiePhoto?.startsWith('data:')) {
      try {
        photoUrls.selfie = await uploadBase64Image(
          formData.selfiePhoto,
          `applications/${referenceNumber}/selfie.jpg`
        );
      } catch (uploadErr) {
        console.error('Selfie upload failed:', uploadErr);
      }
    }

    if (formData.passportPhoto?.startsWith('data:')) {
      try {
        photoUrls.passport = await uploadBase64Image(
          formData.passportPhoto,
          `applications/${referenceNumber}/passport.jpg`
        );
      } catch (uploadErr) {
        console.error('Passport photo upload failed:', uploadErr);
      }
    }

    // ── Build application document ────────────────────────────
    const applicationData = {
      referenceNumber,
      status: 'submitted',
      paymentIntentId,
      paymentAmount: paymentIntent.amount,
      paymentCurrency: paymentIntent.currency,

      passportCountry: formData.passportCountry || null,
      passportNumber: formData.passportNumber || null,
      issueDate: formData.issueDate || null,
      expiryDate: formData.expiryDate || null,
      issuingAuthority: formData.issuingAuthority || null,

      firstName: formData.firstName || null,
      lastName: formData.lastName || null,
      dateOfBirth: formData.dateOfBirth || null,
      gender: formData.gender || null,
      nationality: formData.nationality || null,
      birthCountry: formData.birthCountry || null,

      email: formData.email,
      phone: formData.phone || null,

      selfiePhotoUrl: photoUrls.selfie || null,
      passportPhotoUrl: photoUrls.passport || null,

      criminalConvictions: formData.criminalConvictions || null,
      immigrationBreaches: formData.immigrationBreaches || null,
      previousRefusals: formData.previousRefusals || null,
      terrorismInvolvement: formData.terrorismInvolvement || null,

      addressLine1: formData.addressLine1 || null,
      addressLine2: formData.addressLine2 || null,
      city: formData.city || null,
      state: formData.state || null,
      postcode: formData.postcode || null,
      country: formData.country || null,

      emergencyName: formData.emergencyName || null,
      emergencyRelationship: formData.emergencyRelationship || null,
      emergencyPhone: formData.emergencyPhone || null,

      submittedAt: now,
      updatedAt: now,
    };

    // ── Save to Firestore ─────────────────────────────────────
    await adminDb
      .collection('eta-applications')
      .doc(referenceNumber)
      .set(applicationData);

    // ── Send confirmation email ───────────────────────────────
    const statusUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || 'https://ukgazete.com'
    }/status`;

    const applicantName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: formData.email,
        bcc: [ADMIN_EMAIL],
        subject: `Application Received - ${referenceNumber}`,
        react: ConfirmationEmail({
          referenceNumber,
          applicantName: applicantName || 'Applicant',
          email: formData.email,
          submittedAt: new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          statusUrl,
        }),
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    return NextResponse.json({
      success: true,
      referenceNumber,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Submission failed';
    console.error('Submit application error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
