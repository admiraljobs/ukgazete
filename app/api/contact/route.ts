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
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f7fb; padding: 32px 16px;">
          <div style="background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #dde6f0;">

            <div style="background: #1d70b8; padding: 18px 24px;">
              <div style="color: #ffffff; font-size: 16px; font-weight: bold;">New Contact Form Submission</div>
            </div>

            <div style="padding: 24px;">
              <table style="width: 100%; border-collapse: collapse; background: #f4f7fb; border-radius: 10px; overflow: hidden;">
                <tr><td style="padding: 8px 16px; color: #5b7fa6; font-size: 13px; width: 130px; background: #eef2f8;">Name</td><td style="padding: 8px 16px; color: #0f172a; font-weight: 600;">${name}</td></tr>
                <tr><td style="padding: 8px 16px; color: #5b7fa6; font-size: 13px; background: #eef2f8;">Email</td><td style="padding: 8px 16px;"><a href="mailto:${email}" style="color: #1d70b8;">${email}</a></td></tr>
                <tr><td style="padding: 8px 16px; color: #5b7fa6; font-size: 13px; background: #eef2f8;">Reference</td><td style="padding: 8px 16px; color: #334155; font-family: monospace;">${referenceNumber ? referenceNumber.toUpperCase() : 'N/A'}</td></tr>
                <tr><td style="padding: 8px 16px; color: #5b7fa6; font-size: 13px; background: #eef2f8;">Subject</td><td style="padding: 8px 16px; color: #334155;">${subject}</td></tr>
              </table>

              <div style="background: #eef2f8; border-radius: 10px; padding: 16px 20px; margin-top: 16px; border-left: 4px solid #1d70b8;">
                <p style="color: #5b7fa6; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Message</p>
                <p style="color: #334155; line-height: 1.7; margin: 0; font-size: 14px; white-space: pre-wrap;">${message}</p>
              </div>

              <div style="text-align: center; margin-top: 20px;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background-color: #1d70b8; color: #ffffff; padding: 11px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">Reply to ${name}</a>
              </div>
            </div>

            <div style="background: #eef2f8; padding: 12px 24px; text-align: center; border-top: 1px solid #dde6f0;">
              <p style="color: #5b7fa6; font-size: 12px; margin: 0;">UK ETA Service — Contact Form</p>
            </div>
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
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f7fb; padding: 32px 16px;">
            <div style="background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #dde6f0;">

              <div style="background: #1d70b8; padding: 20px 28px;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width: 44px; height: 44px; background: rgba(255,255,255,0.2); border-radius: 8px; text-align: center; vertical-align: middle;">
                      <span style="color: #ffffff; font-size: 15px; font-weight: bold;">UK</span>
                    </td>
                    <td style="padding-left: 12px;">
                      <div style="color: #ffffff; font-size: 17px; font-weight: bold;">UK ETA Service</div>
                      <div style="color: rgba(255,255,255,0.75); font-size: 12px;">Electronic Travel Authorisation</div>
                    </td>
                  </tr>
                </table>
              </div>

              <div style="padding: 32px 28px;">

                <table cellpadding="0" cellspacing="0" style="width: 56px; height: 56px; background: rgba(29, 112, 184, 0.1); border-radius: 50%; margin: 0 auto 20px;">
                  <tr><td style="text-align: center; vertical-align: middle; color: #1d70b8; font-size: 24px; font-weight: bold;">&#10003;</td></tr>
                </table>

                <h1 style="color: #0f172a; font-size: 22px; text-align: center; margin: 0 0 20px;">Message Received</h1>

                <p style="color: #334155; font-size: 15px; line-height: 24px; margin: 0 0 14px;">Dear ${name},</p>
                <p style="color: #334155; font-size: 15px; line-height: 24px; margin: 0 0 20px;">
                  Thank you for contacting us. We have received your message and our team will get back to you within 24 hours.
                </p>

                <div style="background: #eef2f8; border-radius: 10px; padding: 16px 20px; margin: 0 0 20px; border-left: 4px solid #1d70b8;">
                  <p style="color: #5b7fa6; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Your Message Summary</p>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 5px 0; color: #5b7fa6; font-size: 13px;">Subject</td>
                      <td style="padding: 5px 0; color: #0f172a; font-size: 13px; font-weight: 600; text-align: right;">${subject}</td>
                    </tr>
                    ${referenceNumber ? `<tr><td style="padding: 5px 0; color: #5b7fa6; font-size: 13px;">Reference</td><td style="padding: 5px 0; color: #0f172a; font-size: 13px; font-family: monospace; text-align: right;">${referenceNumber.toUpperCase()}</td></tr>` : ''}
                  </table>
                </div>

                <p style="color: #334155; font-size: 14px; line-height: 22px; margin: 0;">
                  If your enquiry is about an existing application, you can
                  <a href="https://ukgazete.com/status" style="color: #1d70b8;">check your application status</a> online at any time.
                </p>
              </div>

              <div style="background: #eef2f8; padding: 14px 28px; border-top: 1px solid #dde6f0; text-align: center;">
                <p style="color: #5b7fa6; font-size: 13px; margin: 0 0 4px;">UK ETA Service · Electronic Travel Authorisation Assistance</p>
                <p style="color: #94a3b8; font-size: 11px; margin: 0;">Independent service — not affiliated with the UK Government.</p>
              </div>

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
