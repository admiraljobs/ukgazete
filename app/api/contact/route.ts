import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// £79.00 service fee + £2.50 processing fee = £81.50
const SERVICE_FEE_PENCE = 7900;
const PROCESSING_FEE_PENCE = 250;
const TOTAL_PENCE = SERVICE_FEE_PENCE + PROCESSING_FEE_PENCE; // 8150

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, metadata } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: TOTAL_PENCE,
      currency: 'gbp',
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      metadata: {
        ...(metadata || {}),
        service: 'uk-eta-application',
        serviceFee: '79.00',
        processingFee: '2.50',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Payment initialisation failed';
    console.error('Stripe error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
