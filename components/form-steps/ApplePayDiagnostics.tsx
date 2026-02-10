'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// TypeScript declaration for ApplePaySession
declare global {
  interface Window {
    ApplePaySession?: {
      canMakePayments(): boolean;
      supportsVersion(version: number): boolean;
    };
  }
}

export function ApplePayDiagnostics() {
  const [checks, setChecks] = useState<Record<string, any>>({});

  useEffect(() => {
    async function runDiagnostics() {
      const results: Record<string, any> = {};

      // 1. Check protocol
      results.protocol = window.location.protocol;
      results.protocolOK = window.location.protocol === 'https:';

      // 2. Check hostname
      results.hostname = window.location.hostname;
      results.hostnameOK = !window.location.hostname.includes('localhost') && 
                          !window.location.hostname.match(/^\d/);

      // 3. Check ApplePaySession
      results.applePaySessionExists = typeof window.ApplePaySession !== 'undefined';
      
      if (window.ApplePaySession) {
        results.applePayCanMakePayments = window.ApplePaySession.canMakePayments();
        results.applePayVersion = window.ApplePaySession.supportsVersion(10) ? '10+' :
                                 window.ApplePaySession.supportsVersion(3) ? '3+' : 'old';
      }

      // 4. Check user agent
      results.userAgent = navigator.userAgent;
      results.isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      results.isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

      // 5. Test Stripe Payment Request
      try {
        const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        if (stripeKey) {
          results.stripeKeyFound = true;
          const stripe = await loadStripe(stripeKey);
          
          if (stripe) {
            results.stripeLoaded = true;
            
            const pr = stripe.paymentRequest({
              country: 'GB',
              currency: 'gbp',
              total: {
                label: 'Test',
                amount: 100,
              },
            });

            const canMake = await pr.canMakePayment();
            results.stripeCanMakePayment = canMake;
            
            if (canMake) {
              results.paymentMethod = canMake.applePay ? 'Apple Pay' : 
                                     canMake.googlePay ? 'Google Pay' : 
                                     'Unknown';
            }
          } else {
            results.stripeLoaded = false;
            results.error = 'Stripe failed to load';
          }
        } else {
          results.stripeKeyFound = false;
          results.error = 'Stripe key not found';
        }
      } catch (error) {
        results.stripeError = error instanceof Error ? error.message : String(error);
      }

      setChecks(results);
    }

    runDiagnostics();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 max-w-md p-4 bg-white border-2 border-black rounded-lg shadow-lg text-xs font-mono z-50 max-h-96 overflow-y-auto">
      <h3 className="font-bold mb-2 text-base">🔍 Apple Pay Diagnostics</h3>
      
      <div className="space-y-1">
        <div className={checks.protocolOK ? 'text-green-600' : 'text-red-600'}>
          {checks.protocolOK ? '✅' : '❌'} HTTPS: {checks.protocol}
        </div>
        
        <div className={checks.hostnameOK ? 'text-green-600' : 'text-red-600'}>
          {checks.hostnameOK ? '✅' : '❌'} Domain: {checks.hostname}
        </div>
        
        <div className={checks.applePaySessionExists ? 'text-green-600' : 'text-red-600'}>
          {checks.applePaySessionExists ? '✅' : '❌'} ApplePaySession: {checks.applePaySessionExists ? 'Available' : 'Not Available'}
        </div>
        
        {checks.applePaySessionExists && (
          <div className={checks.applePayCanMakePayments ? 'text-green-600' : 'text-red-600'}>
            {checks.applePayCanMakePayments ? '✅' : '❌'} Can Make Payments: {String(checks.applePayCanMakePayments)}
          </div>
        )}
        
        <div className={checks.isSafari ? 'text-green-600' : 'text-red-600'}>
          {checks.isSafari ? '✅' : '❌'} Safari: {String(checks.isSafari)}
        </div>
        
        <div className={checks.isIOS ? 'text-green-600' : 'text-blue-600'}>
          {checks.isIOS ? '✅' : 'ℹ️'} iOS Device: {String(checks.isIOS)}
        </div>
        
        <div className={checks.stripeKeyFound ? 'text-green-600' : 'text-red-600'}>
          {checks.stripeKeyFound ? '✅' : '❌'} Stripe Key: {checks.stripeKeyFound ? 'Found' : 'Missing'}
        </div>
        
        {checks.stripeLoaded !== undefined && (
          <div className={checks.stripeLoaded ? 'text-green-600' : 'text-red-600'}>
            {checks.stripeLoaded ? '✅' : '❌'} Stripe Loaded: {String(checks.stripeLoaded)}
          </div>
        )}
        
        {checks.stripeCanMakePayment !== undefined && (
          <div className={checks.stripeCanMakePayment ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
            {checks.stripeCanMakePayment ? '✅ APPLE PAY AVAILABLE!' : '❌ NO PAYMENT METHOD AVAILABLE'}
          </div>
        )}
        
        {checks.paymentMethod && (
          <div className="text-green-600 font-bold">
            Payment Method: {checks.paymentMethod}
          </div>
        )}
        
        {checks.stripeError && (
          <div className="text-red-600 mt-2">
            Error: {checks.stripeError}
          </div>
        )}
        
        {checks.error && (
          <div className="text-red-600 mt-2">
            Error: {checks.error}
          </div>
        )}
      </div>

      {!checks.applePayCanMakePayments && checks.applePaySessionExists && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-300 rounded text-black">
          <strong>⚠️ Apple Pay Session exists but can't make payments</strong>
          <br/>
          Possible reasons:
          <ul className="list-disc ml-4 mt-1">
            <li>No card in Apple Wallet</li>
            <li>Safari Private Mode</li>
            <li>Domain not verified in Stripe</li>
          </ul>
        </div>
      )}

      {!checks.applePaySessionExists && (
        <div className="mt-3 p-2 bg-red-50 border border-red-300 rounded text-black">
          <strong>❌ ApplePaySession not available</strong>
          <br/>
          You need:
          <ul className="list-disc ml-4 mt-1">
            <li>Safari browser</li>
            <li>iPhone/iPad/Mac</li>
            <li>Not in iframe</li>
          </ul>
        </div>
      )}
    </div>
  );
}
