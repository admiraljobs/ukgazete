const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface TurnstileVerifyResult {
  success: boolean;
  error?: string;
}

/**
 * Verify a Cloudflare Turnstile token server-side.
 * Returns { success: true } if valid, or { success: false, error: '...' } if not.
 */
export async function verifyTurnstile(token: string | undefined | null): Promise<TurnstileVerifyResult> {
  if (!TURNSTILE_SECRET_KEY) {
    console.warn('TURNSTILE_SECRET_KEY not set — skipping verification');
    return { success: true }; // Allow in dev if not configured
  }

  if (!token) {
    return { success: false, error: 'Security verification is required' };
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      console.error('Turnstile verification failed:', data['error-codes']);
      return { success: false, error: 'Security verification failed. Please try again.' };
    }

    return { success: true };
  } catch (err) {
    console.error('Turnstile verification error:', err);
    return { success: false, error: 'Security verification unavailable. Please try again.' };
  }
}
