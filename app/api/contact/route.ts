import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { verifyTurnstile } from '@/lib/turnstile';

const ADMIN_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@ukgazete.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, referenceNumber, subject, message, turnstileToken } = body;

    // ── Turnstile verification ────────────────────────────────
    const turnstileResult = await verifyTurnstile(turnstileToken);
    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: turnstileResult.error },
        { status: 403 }
      );
    }

    // ── Validation ────────────────────────────────────────────
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Valid name is required' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== 'string') {
      return NextResponse.json(
        { error: 'Subject is required' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // ── Send notification to admin ────────────────────────────
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `[Contact Form] ${subject} - ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0c10; color: #c5c6c7; padding: 32px;">
          <div style="border-bottom: 1px solid #1f2833; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="color: #66fcf1; margin: 0;">New Contact Form Submission</h2>
          </div>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; color: #888; width: 140px;">Name</td>
              <td style="padding: 8px 12px; color: #ffffff;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #888;">Email</td>
              <td style="padding: 8px 12px;"><a href="mailto:${email}" style="color: #66fcf1;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #888;">Reference</td>
              <td style="padding: 8px 12px; color: #ffffff;">${referenceNumber ? referenceNumber.toUpperCase() : 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #888;">Subject</td>
              <td style="padding: 8px 12px; color: #ffffff;">${subject}</td>
            </tr>
          </table>
          
          <div style="background-color: #1f2833; border-radius: 8px; padding: 16px; margin-top: 24px;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Message</p>
            <p style="color: #c5c6c7; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background-color: #66fcf1; color: #0b0c10; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Reply to ${name}</a>
          </div>
        </div>
      `,
    });

    // ── Send confirmation to user ─────────────────────────────
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `We've received your message - UK ETA Service`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0c10; color: #c5c6c7; padding: 32px;">
            <div style="border-bottom: 1px solid #1f2833; padding-bottom: 16px; margin-bottom: 24px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width: 48px; height: 48px; background-color: #66fcf1; border-radius: 12px; text-align: center; vertical-align: middle;">
                    <span style="color: #0b0c10; font-size: 18px; font-weight: bold;">UK</span>
                  </td>
                  <td style="padding-left: 12px;">
                    <span style="color: #ffffff; font-size: 20px; font-weight: bold;">UK ETA Service</span>
                  </td>
                </tr>
              </table>
            </div>
            
            <table cellpadding="0" cellspacing="0" style="width: 64px; height: 64px; background-color: rgba(34, 197, 94, 0.2); border-radius: 50%; margin: 0 auto 24px;">
              <tr>
                <td style="text-align: center; vertical-align: middle; color: #22c55e; font-size: 32px;">&#10003;</td>
              </tr>
            </table>
            
            <h1 style="color: #ffffff; font-size: 24px; text-align: center; margin: 0 0 24px;">Message Received</h1>
            
            <p style="color: #c5c6c7; font-size: 16px; line-height: 24px;">Dear ${name},</p>
            
            <p style="color: #c5c6c7; font-size: 16px; line-height: 24px;">
              Thank you for contacting us. We've received your message and our team will get back to you within 24 hours.
            </p>
            
            <div style="background-color: #1f2833; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Your Message Summary</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 14px;">Subject</td>
                  <td style="padding: 6px 0; color: #ffffff; font-size: 14px; text-align: right;">${subject}</td>
                </tr>
                ${referenceNumber ? `
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 14px;">Reference</td>
                  <td style="padding: 6px 0; color: #ffffff; font-size: 14px; text-align: right;">${referenceNumber.toUpperCase()}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <p style="color: #c5c6c7; font-size: 14px; line-height: 22px;">
              If your inquiry is about an existing application, you can also 
              <a href="https://ukgazete.com/status" style="color: #66fcf1; text-decoration: underline;">check your application status</a> online.
            </p>
            
            <div style="border-top: 1px solid #1f2833; margin-top: 32px; padding-top: 24px; text-align: center;">
              <p style="color: #888; font-size: 14px; margin: 0 0 8px;">UK ETA Service | Electronic Travel Authorisation Assistance</p>
              <p style="color: #666; font-size: 12px; margin: 0;">This is an independent service and is not affiliated with the UK Government.</p>
            </div>
          </div>
        `,
      });
    } catch (confirmErr) {
      console.error('Failed to send user confirmation:', confirmErr);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to send message';
    console.error('Contact form error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
