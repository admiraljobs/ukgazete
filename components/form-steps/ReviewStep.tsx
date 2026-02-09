'use client';

import { useState, useEffect } from 'react';
import { useFormContext } from '@/lib/form-context';
import { useTranslations } from 'next-intl';
import { 
  PaymentElement, 
  PaymentRequestButtonElement,
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';
import type { PaymentRequest } from '@stripe/stripe-js';
import { Mail, CreditCard, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function ReviewStep() {
  const t = useTranslations();
  const { formData } = useFormContext();
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [canMakePayment, setCanMakePayment] = useState(false);

  // Initialize Payment Request (Apple Pay / Google Pay)
  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: 'GB',
      currency: 'gbp',
      total: {
        label: 'UK ETA Application',
        amount: 5249, // £52.49 in pence
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    // Check if Apple Pay / Google Pay is available
    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
        setCanMakePayment(true);
      }
    });

    // Handle payment method
    pr.on('paymentmethod', async (e) => {
      setIsProcessing(true);
      setPaymentStatus('idle');
      setErrorMessage('');

      try {
        // Create payment intent
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: e.payerEmail || email,
            metadata: {
              applicantName: `${formData.firstName} ${formData.lastName}`,
              passportNumber: formData.passportNumber,
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const { clientSecret } = await response.json();

        // Confirm payment
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          { payment_method: e.paymentMethod.id },
          { handleActions: false }
        );

        if (confirmError) {
          e.complete('fail');
          throw confirmError;
        }

        e.complete('success');

        if (paymentIntent.status === 'requires_action') {
          const { error: actionError } = await stripe.confirmCardPayment(clientSecret);
          if (actionError) {
            throw actionError;
          }
        }

        // Submit application
        await submitApplication(paymentIntent.id, e.payerEmail || email);
        setPaymentStatus('success');
      } catch (error) {
        console.error('Payment error:', error);
        e.complete('fail');
        setPaymentStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Payment failed');
      } finally {
        setIsProcessing(false);
      }
    });
  }, [stripe, formData, email]);

  const submitApplication = async (paymentIntentId: string, applicantEmail: string) => {
    const response = await fetch('/api/submit-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formData,
        paymentIntentId,
        email: applicantEmail,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit application');
    }

    return response.json();
  };

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !email) {
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('idle');
    setErrorMessage('');

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          metadata: {
            applicantName: `${formData.firstName} ${formData.lastName}`,
            passportNumber: formData.passportNumber,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/status`,
          receipt_email: email,
        },
        redirect: 'if_required',
      });

      if (error) {
        throw error;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        await submitApplication(paymentIntent.id, email);
        setPaymentStatus('success');
        
        // Redirect after short delay
        setTimeout(() => {
          window.location.href = `/status?payment_intent=${paymentIntent.id}`;
        }, 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  // Application summary data row component
  function DataRow({ label, value }: { label: string; value?: string | null }) {
    return (
      <div className="flex justify-between text-sm">
        <span className="text-slate-400">{label}:</span>
        <span className="text-slate-200">{value || '-'}</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Application Summary */}
      <div className="bg-navy-900/50 backdrop-blur-sm border border-navy-700/50 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gold-400 mb-6">
          {t('review.title') || 'Review Your Application'}
        </h2>

        {/* Passport */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gold-400 mb-3">Passport Details</h3>
          <div className="bg-navy-800/30 rounded-lg p-4 space-y-2">
            <DataRow label="Country" value={formData.passportCountry} />
            <DataRow label="Passport Number" value={formData.passportNumber} />
            <DataRow label="Issue Date" value={formData.issueDate} />
            <DataRow label="Expiry Date" value={formData.expiryDate} />
          </div>
        </div>

        {/* Personal */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gold-400 mb-3">Personal Information</h3>
          <div className="bg-navy-800/30 rounded-lg p-4 space-y-2">
            <DataRow label="Name" value={`${formData.firstName} ${formData.lastName}`} />
            <DataRow label="Date of Birth" value={formData.dateOfBirth} />
            <DataRow label="Gender" value={formData.gender} />
            <DataRow label="Nationality" value={formData.nationality} />
          </div>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gold-400 mb-3">Contact Information</h3>
          <div className="bg-navy-800/30 rounded-lg p-4 space-y-2">
            <DataRow label="Email" value={formData.email} />
            <DataRow label="Phone" value={formData.phone} />
          </div>
        </div>

        {/* Address */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gold-400 mb-3">Address</h3>
          <div className="bg-navy-800/30 rounded-lg p-4 space-y-2">
            <DataRow label="Address" value={`${formData.addressLine1}${formData.addressLine2 ? `, ${formData.addressLine2}` : ''}`} />
            <DataRow label="City" value={formData.city} />
            <DataRow label="Postcode" value={formData.postcode} />
            <DataRow label="Country" value={formData.country} />
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-navy-900/50 backdrop-blur-sm border border-navy-700/50 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gold-400 mb-6 flex items-center gap-2">
          <CreditCard className="w-6 h-6" />
          {t('review.payment') || 'Payment'}
        </h2>

        <div className="mb-6 bg-navy-800/40 border border-gold-500/20 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Application Fee:</span>
            <span className="text-2xl font-bold text-gold-400">£52.49</span>
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email for Receipt
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full bg-navy-800/60 border border-navy-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
            disabled={isProcessing}
            required
          />
        </div>

        {/* Apple Pay / Google Pay Button */}
        {canMakePayment && paymentRequest && (
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-navy-600/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-navy-900/50 text-slate-400">Express Checkout</span>
              </div>
            </div>
            
            <div className="mt-4">
              <PaymentRequestButtonElement 
                options={{ 
                  paymentRequest,
                  style: {
                    paymentRequestButton: {
                      type: 'default',
                      theme: 'dark',
                      height: '48px',
                    },
                  },
                }} 
              />
            </div>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-navy-600/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-navy-900/50 text-slate-400">Or pay with card</span>
              </div>
            </div>
          </div>
        )}

        {/* Payment Element (Card Payment) */}
        <form onSubmit={handleCardPayment}>
          <div className="mb-6">
            <PaymentElement />
          </div>

          {/* Error Message */}
          {paymentStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start gap-3"
            >
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-200 text-sm font-medium">Payment Failed</p>
                <p className="text-red-300/80 text-sm mt-1">{errorMessage}</p>
              </div>
            </motion.div>
          )}

          {/* Success Message */}
          {paymentStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <div className="flex-1">
                <p className="text-green-200 text-sm font-medium">Payment Successful!</p>
                <p className="text-green-300/80 text-sm mt-1">Redirecting you now...</p>
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || !elements || !email || isProcessing || paymentStatus === 'success'}
            className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-gold-500/25 disabled:shadow-none flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : paymentStatus === 'success' ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Payment Complete
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Pay £52.49
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center mt-4">
          Your payment is secured by Stripe. We do not store your card details.
        </p>
      </div>
    </motion.div>
  );
}
