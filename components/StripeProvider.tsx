'use client';

import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable');
}

const stripePromise = loadStripe(publishableKey);

interface StripeProviderProps {
  clientSecret: string;
  children: ReactNode;
}

export function StripeProvider({ clientSecret, children }: StripeProviderProps) {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#1d70b8',
        colorBackground: '#ffffff',
        colorText: '#0f172a',
        colorTextSecondary: '#5b7fa6',
        colorDanger: '#ef4444',
        fontFamily: 'DM Sans, system-ui, -apple-system, sans-serif',
        borderRadius: '12px',
        spacingUnit: '4px',
        fontSizeBase: '15px',
      },
      rules: {
        '.Input': {
          border: '1px solid #dde6f0',
          boxShadow: 'none',
          padding: '12px 16px',
        },
        '.Input:focus': {
          border: '1px solid #1d70b8',
          boxShadow: '0 0 0 2px rgba(29, 112, 184, 0.2)',
        },
        '.Label': {
          color: '#334155',
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '8px',
        },
        '.Tab': {
          border: '1px solid #dde6f0',
          boxShadow: 'none',
        },
        '.Tab--selected': {
          border: '1px solid #1d70b8',
          boxShadow: '0 0 0 1px #1d70b8',
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
