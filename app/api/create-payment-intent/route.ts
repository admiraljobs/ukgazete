import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const { email, metadata } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5249, // £52.49
      currency: 'gbp',
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      metadata: {
        ...metadata,
        service: 'uk-eta-application',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Payment failed';
    console.error('Stripe error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
