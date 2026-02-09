import { NextResponse } from 'next/server';

/**
 * Serves the Apple Pay domain verification file.
 * Apple and Stripe require this file to be accessible at:
 * https://yourdomain.com/.well-known/apple-developer-merchantid-domain-association
 *
 * This route fetches the file directly from Stripe so it's always up to date.
 */
export async function GET() {
  try {
    const response = await fetch(
      'https://stripe.com/files/apple-pay/apple-developer-merchantid-domain-association',
      { next: { revalidate: 86400 } } // cache for 24 hours
    );

    if (!response.ok) {
      return new NextResponse('File not found', { status: 404 });
    }

    const body = await response.arrayBuffer();

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return new NextResponse('Failed to fetch verification file', { status: 500 });
  }
}
