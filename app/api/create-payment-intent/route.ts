import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(request: Request) {
  try {
    const { email, metadata } = await request.json();

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5249, // £52.49 in pence (£49.99 + £2.50 fee)
      currency: 'gbp',
      automatic_payment_methods: {
        enabled: true,
      },
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
    const errorMessage = error instanceof Error ? error.message : 'Payment failed';
    console.error('Stripe error:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}