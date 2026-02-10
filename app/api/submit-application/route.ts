import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb, adminStorage } from '@/lib/firebase-admin';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { ConfirmationEmail } from '@/emails/confirmation';

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
  // Strip the data URI prefix (e.g. "data:image/jpeg;base64,")
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

  // Make the file publicly readable
  await file.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${path}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData, paymentIntentId } = body;

    if (!formData || !paymentIntentId) {
      return NextResponse.json(
        { error: 'Missing form data or payment ID' },
        { status: 400 }
      );
    }

    // Verify the payment was actually successful with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment has not been completed' },
        { status: 400 }
      );
    }

    const referenceNumber = generateReferenceNumber();
    const now = new Date().toISOString();

    // Upload photos to Firebase Storage
    const photoUrls: Record<string, string> = {};

    if (formData.selfiePhoto && formData.selfiePhoto.startsWith('data:')) {
      photoUrls.selfie = await uploadBase64Image(
        formData.selfiePhoto,
        `applications/${referenceNumber}/selfie.jpg`
      );
    }

    if (formData.passportPhoto && formData.passportPhoto.startsWith('data:')) {
      photoUrls.passport = await uploadBase64Image(
        formData.passportPhoto,
        `applications/${referenceNumber}/passport.jpg`
      );
    }

    // Build the application document (exclude raw base64 from Firestore)
    const applicationData = {
      referenceNumber,
      status: 'submitted',
      paymentIntentId,
      paymentAmount: paymentIntent.amount,
      paymentCurrency: paymentIntent.currency,

      // Passport
      passportCountry: formData.passportCountry || null,
      passportNumber: formData.passportNumber || null,
      issueDate: formData.issueDate || null,
      expiryDate: formData.expiryDate || null,
      issuingAuthority: formData.issuingAuthority || null,

      // Personal
      firstName: formData.firstName || null,
      lastName: formData.lastName || null,
      dateOfBirth: formData.dateOfBirth || null,
      gender: formData.gender || null,
      nationality: formData.nationality || null,
      birthCountry: formData.birthCountry || null,

      // Contact
      email: formData.email || null,
      phone: formData.phone || null,

      // Photos (URLs, not base64)
      selfiePhotoUrl: photoUrls.selfie || null,
      passportPhotoUrl: photoUrls.passport || null,

      // Background
      criminalConvictions: formData.criminalConvictions || null,
      immigrationBreaches: formData.immigrationBreaches || null,
      previousRefusals: formData.previousRefusals || null,
      terrorismInvolvement: formData.terrorismInvolvement || null,

      // Address
      addressLine1: formData.addressLine1 || null,
      addressLine2: formData.addressLine2 || null,
      city: formData.city || null,
      state: formData.state || null,
      postcode: formData.postcode || null,
      country: formData.country || null,

      // Emergency
      emergencyName: formData.emergencyName || null,
      emergencyRelationship: formData.emergencyRelationship || null,
      emergencyPhone: formData.emergencyPhone || null,

      // Meta
      submittedAt: now,
      updatedAt: now,
    };

    // Save to Firestore
    await adminDb
      .collection('eta-applications')
      .doc(referenceNumber)
      .set(applicationData);

    // Send confirmation email
    const statusUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://uketa-service.com'}/status`;
    const applicantName = `${formData.firstName} ${formData.lastName}`;

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: formData.email,
        subject: `Application Received - ${referenceNumber}`,
        react: ConfirmationEmail({
          referenceNumber,
          applicantName,
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
      // Don't fail the request - application is already saved
    }

    return NextResponse.json({
      success: true,
      referenceNumber,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Submission failed';
    console.error('Submit application error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}