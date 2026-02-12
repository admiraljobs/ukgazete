import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb, adminStorage } from '@/lib/firebase-admin';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { ConfirmationEmail } from '@/emails/confirmation';

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
    const { formData, paymentIntentId } = body;

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

    // ── Send confirmation email to applicant ──────────────────
    const statusUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || 'https://ukgazete.com'
    }/status`;

    const applicantName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();
    const submittedDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: formData.email,
        subject: `Application Received - ${referenceNumber}`,
        react: ConfirmationEmail({
          referenceNumber,
          applicantName: applicantName || 'Applicant',
          email: formData.email,
          submittedAt: submittedDate,
          statusUrl,
        }),
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    // ── Send separate admin notification ──────────────────────
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `🆕 New ETA Application - ${referenceNumber}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; background-color: #0b0c10; color: #c5c6c7; padding: 32px;">
            <div style="border-bottom: 1px solid #1f2833; padding-bottom: 16px; margin-bottom: 24px;">
              <h2 style="color: #66fcf1; margin: 0 0 4px;">New ETA Application</h2>
              <p style="color: #888; margin: 0; font-size: 14px;">${submittedDate}</p>
            </div>

            <!-- Reference & Payment -->
            <div style="background-color: #1f2833; border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #66fcf1;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px; width: 160px;">Reference</td>
                  <td style="padding: 6px 0; color: #66fcf1; font-size: 16px; font-weight: bold; font-family: monospace;">${referenceNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Payment</td>
                  <td style="padding: 6px 0; color: #22c55e; font-weight: 600;">£${(paymentIntent.amount / 100).toFixed(2)} ${paymentIntent.currency.toUpperCase()} ✓</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Stripe ID</td>
                  <td style="padding: 6px 0; color: #c5c6c7; font-size: 12px; font-family: monospace;">${paymentIntentId}</td>
                </tr>
              </table>
            </div>

            <!-- Applicant Details -->
            <div style="background-color: #1f2833; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #ffffff; margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Applicant</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px; width: 160px;">Name</td>
                  <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${applicantName || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Email</td>
                  <td style="padding: 6px 0;"><a href="mailto:${formData.email}" style="color: #66fcf1;">${formData.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Phone</td>
                  <td style="padding: 6px 0; color: #c5c6c7;">${formData.phone || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Date of Birth</td>
                  <td style="padding: 6px 0; color: #c5c6c7;">${formData.dateOfBirth || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Gender</td>
                  <td style="padding: 6px 0; color: #c5c6c7;">${formData.gender || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Nationality</td>
                  <td style="padding: 6px 0; color: #c5c6c7;">${formData.nationality || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Birth Country</td>
                  <td style="padding: 6px 0; color: #c5c6c7;">${formData.birthCountry || 'N/A'}</td>
                </tr>
              </table>
            </div>

            <!-- Passport -->
            <div style="background-color: #1f2833; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #ffffff; margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Passport</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px; width: 160px;">Country</td>
                  <td style="padding: 6px 0; color: #c5c6c7;">${formData.passportCountry || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Passport Number</td>
                  <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${formData.passportNumber || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Issue Date</td>
                  <td style="padding: 6px 0; color: #c5c6c7;">${formData.issueDate || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Expiry Date</td>
                  <td style="padding: 6px 0; color: #c5c6c7;">${formData.expiryDate || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Issuing Authority</td>
                  <td style="padding: 6px 0; color: #c5c6c7;">${formData.issuingAuthority || 'N/A'}</td>
                </tr>
              </table>
            </div>

            <!-- Background Checks -->
            <div style="background-color: #1f2833; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #ffffff; margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Background</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px; width: 160px;">Criminal Convictions</td>
                  <td style="padding: 6px 0; color: ${formData.criminalConvictions === 'yes' ? '#ef4444' : '#22c55e'}; font-weight: 600;">${formData.criminalConvictions === 'yes' ? '⚠️ YES' : '✓ No'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Immigration Breaches</td>
                  <td style="padding: 6px 0; color: ${formData.immigrationBreaches === 'yes' ? '#ef4444' : '#22c55e'}; font-weight: 600;">${formData.immigrationBreaches === 'yes' ? '⚠️ YES' : '✓ No'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Previous Refusals</td>
                  <td style="padding: 6px 0; color: ${formData.previousRefusals === 'yes' ? '#ef4444' : '#22c55e'}; font-weight: 600;">${formData.previousRefusals === 'yes' ? '⚠️ YES' : '✓ No'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Terrorism Involvement</td>
                  <td style="padding: 6px 0; color: ${formData.terrorismInvolvement === 'yes' ? '#ef4444' : '#22c55e'}; font-weight: 600;">${formData.terrorismInvolvement === 'yes' ? '⚠️ YES' : '✓ No'}</td>
                </tr>
              </table>
            </div>

            <!-- Address -->
            <div style="background-color: #1f2833; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #ffffff; margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Address</h3>
              <p style="color: #c5c6c7; margin: 0; line-height: 1.6;">
                ${formData.addressLine1 || ''}${formData.addressLine2 ? '<br>' + formData.addressLine2 : ''}<br>
                ${formData.city || ''}${formData.state ? ', ' + formData.state : ''} ${formData.postcode || ''}<br>
                ${formData.country || ''}
              </p>
            </div>

            <!-- Emergency Contact -->
            ${formData.emergencyName ? `
            <div style="background-color: #1f2833; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #ffffff; margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Emergency Contact</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px; width: 160px;">Name</td>
                  <td style="padding: 6px 0; color: #c5c6c7;">${formData.emergencyName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Relationship</td>
                  <td style="padding: 6px 0; color: #c5c6c7;">${formData.emergencyRelationship || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Phone</td>
                  <td style="padding: 6px 0; color: #c5c6c7;">${formData.emergencyPhone || 'N/A'}</td>
                </tr>
              </table>
            </div>
            ` : ''}

            <!-- Photos -->
            <div style="background-color: #1f2833; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #ffffff; margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Photos</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px; width: 160px;">Selfie</td>
                  <td style="padding: 6px 0;">${photoUrls.selfie ? '<a href="' + photoUrls.selfie + '" style="color: #66fcf1;">View Photo</a>' : '<span style="color: #ef4444;">Not uploaded</span>'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Passport Scan</td>
                  <td style="padding: 6px 0;">${photoUrls.passport ? '<a href="' + photoUrls.passport + '" style="color: #66fcf1;">View Photo</a>' : '<span style="color: #ef4444;">Not uploaded</span>'}</td>
                </tr>
              </table>
            </div>

            <!-- Quick Actions -->
            <div style="text-align: center; margin-top: 24px;">
              <a href="mailto:${formData.email}?subject=Re: ETA Application ${referenceNumber}" style="display: inline-block; background-color: #66fcf1; color: #0b0c10; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">Reply to Applicant</a>
            </div>

            <div style="border-top: 1px solid #1f2833; margin-top: 24px; padding-top: 16px; text-align: center;">
              <p style="color: #666; font-size: 12px; margin: 0;">UK ETA Service — Admin Notification</p>
            </div>
          </div>
        `,
      });
    } catch (adminEmailError) {
      console.error('Failed to send admin notification:', adminEmailError);
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
