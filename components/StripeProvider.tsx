'use client';

import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface StripeProviderProps {
  clientSecret: string;
  children: ReactNode;
}

export function StripeProvider({ clientSecret, children }: StripeProviderProps) {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#D4A853',
        colorBackground: '#0a1628',
        colorText: '#e2e8f0',
        colorTextSecondary: '#94a3b8',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        borderRadius: '12px',
        spacingUnit: '4px',
        fontSizeBase: '15px',
      },
      rules: {
        '.Input': {
          backgroundColor: 'rgba(15, 30, 60, 0.6)',
          border: '1px solid rgba(59, 90, 150, 0.5)',
          boxShadow: 'none',
          padding: '12px 16px',
        },
        '.Input:focus': {
          border: '1px solid #D4A853',
          boxShadow: '0 0 0 1px #D4A853',
        },
        '.Label': {
          color: '#94a3b8',
          fontSize: '14px',
          marginBottom: '8px',
        },
        '.Tab': {
          backgroundColor: 'rgba(15, 30, 60, 0.4)',
          border: '1px solid rgba(59, 90, 150, 0.4)',
        },
        '.Tab--selected': {
          backgroundColor: 'rgba(212, 168, 83, 0.15)',
          border: '1px solid #D4A853',
        },
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
