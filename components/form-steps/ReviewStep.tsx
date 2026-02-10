'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import {
  PaymentElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import type { PaymentRequest } from '@stripe/stripe-js';
import {
  Edit2,
  CheckCircle,
  Shield,
  CreditCard,
  Lock,
  FileText,
  User,
  Mail,
  Camera,
  ClipboardCheck,
  MapPin,
  Heart,
  Copy,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { useFormContext } from '@/lib/form-context';
import { consentSchema, ConsentData, FORM_STEPS } from '@/lib/validations';
import { FormNavigation } from '../FormNavigation';
import { StripeProvider } from '../StripeProvider';
import { COUNTRIES, cn } from '@/lib/utils';

// TypeScript declaration for ApplePaySession
declare global {
  interface Window {
    ApplePaySession?: {
      canMakePayments(): boolean;
      supportsVersion(version: number): boolean;
    };
  }
}

// ─── Pricing ────────────────────────────────────────────────
const SERVICE_FEE = 79.00;
const PROCESSING_FEE = 2.50;
const TOTAL = SERVICE_FEE + PROCESSING_FEE;

// ─── Sub-components ─────────────────────────────────────────

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  onEdit: () => void;
  children: React.ReactNode;
  editLabel: string;
}

function ReviewSection({ title, icon, onEdit, children, editLabel }: SectionProps) {
  return (
    <div className="p-5 rounded-xl bg-surface-elevated/30 border border-brand-royal/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-accent/20 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-brand-light font-medium">{title}</h3>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-brand-accent hover:bg-brand-accent/10 transition-colors text-sm"
        >
          <Edit2 className="w-4 h-4" />
          <span>{editLabel}</span>
        </button>
      </div>
      <div className="space-y-2 text-sm">{children}</div>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between py-1.5">
      <span className="text-brand-light/50">{label}</span>
      <span className="text-brand-light font-medium">{value || '—'}</span>
    </div>
  );
}

// ─── Confirmation Screen ────────────────────────────────────

interface ConfirmationProps {
  referenceNumber: string;
  email: string;
}

function ConfirmationScreen({ referenceNumber, email }: ConfirmationProps) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const copyReference = () => {
    navigator.clipboard.writeText(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-400" />
      </div>

      <h2 className="text-2xl font-bold text-brand-light mb-2">
        {t('confirmation.title')}
      </h2>
      <p className="text-brand-light/60 mb-8">
        {t('confirmation.description')}
      </p>

      {/* Reference Number */}
      <div className="p-6 rounded-xl bg-surface-elevated/40 border border-brand-accent/30 mb-6 max-w-md mx-auto">
        <p className="text-brand-light/50 text-sm mb-2">{t('confirmation.reference')}</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl font-mono font-bold text-brand-accent tracking-wider">
            {referenceNumber}
          </span>
          <button
            type="button"
            onClick={copyReference}
            className="p-2 rounded-lg hover:bg-brand-accent/10 transition-colors"
            aria-label="Copy reference number"
          >
            {copied ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <Copy className="w-5 h-5 text-brand-accent" />
            )}
          </button>
        </div>
        <p className="text-brand-light/40 text-xs mt-2">{t('confirmation.referenceHelp')}</p>
      </div>

      {/* Email confirmation */}
      <p className="text-brand-light/60 text-sm mb-8">
        {t('confirmation.email')} <span className="text-brand-light font-medium">{email}</span>
      </p>

      {/* Next Steps */}
      <div className="p-6 rounded-xl bg-surface-elevated/20 border border-brand-royal/30 max-w-lg mx-auto mb-8 text-left">
        <h3 className="text-brand-light font-medium mb-4">{t('confirmation.nextSteps')}</h3>
        <div className="space-y-3">
          {[t('confirmation.step1'), t('confirmation.step2'), t('confirmation.step3')].map(
            (step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-accent text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-brand-light/70 text-sm">{step}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="/status"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-accent text-surface-dark font-medium hover:bg-brand-accent/90 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          {t('confirmation.status')}
        </a>
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-brand-royal/50 text-brand-light hover:bg-surface-elevated/30 transition-colors"
        >
          {t('confirmation.newApplication')}
        </a>
      </div>
    </div>
  );
}

// ─── Payment Form (inside Stripe Elements) ──────────────────

interface PaymentFormProps {
  onSuccess: (paymentIntentId: string) => void;
  onError: (message: string) => void;
  isProcessing: boolean;
  setIsProcessing: (v: boolean) => void;
}

function PaymentForm({ onSuccess, onError, isProcessing, setIsProcessing }: PaymentFormProps) {
  const t = useTranslations();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentReady, setPaymentReady] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);

  // Initialize Apple Pay / Google Pay
  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: 'GB',
      currency: 'gbp',
      total: {
        label: 'UK ETA Application',
        amount: 8150, // £81.50 in pence (£79 + £2.50)
      },
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });
  }, [stripe]);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href, // fallback, we handle inline
      },
      redirect: 'if_required',
    });

    if (error) {
      onError(error.message || t('payment.error'));
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent.id);
    } else {
      // Handle other statuses (processing, requires_action, etc.)
      onError(t('payment.error'));
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Apple Pay / Google Pay Button */}
      {paymentRequest && (
        <div>
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
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-royal/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-surface-elevated/30 text-brand-light/50">Or pay with card</span>
            </div>
          </div>
        </div>
      )}

      <PaymentElement
        onReady={() => setPaymentReady(true)}
        options={{
          layout: {
            type: 'accordion',
            defaultCollapsed: true,
            radios: true,
            spacedAccordionItems: true,
          },
        }}
      />

      {!paymentReady && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 text-brand-accent animate-spin" />
          <span className="text-brand-light/60 text-sm ml-2">{t('common.loading')}</span>
        </div>
      )}

      <button
        type="button"
        onClick={handlePayment}
        disabled={!stripe || !paymentReady || isProcessing}
        className={cn(
          'w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2',
          isProcessing || !paymentReady
            ? 'bg-brand-accent/40 text-surface-dark/60 cursor-not-allowed'
            : 'bg-brand-accent hover:bg-brand-accent/90 text-surface-dark'
        )}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t('payment.processing')}
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            {t('payment.submit')} — £{TOTAL.toFixed(2)}
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-brand-light/40 text-xs">
        <Shield className="w-4 h-4" />
        <span>{t('payment.secure')}</span>
      </div>
    </div>
  );
}

// ─── Main ReviewStep ────────────────────────────────────────

export function ReviewStep() {
  const t = useTranslations();
  const tCountries = useTranslations('countries');
  const { formData, goToStep, isSubmitting, setIsSubmitting } = useFormContext();
  
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ConsentData>({
    resolver: zodResolver(consentSchema),
    defaultValues: {
      confirmAccuracy: false,
      consentSubmit: false,
      acceptTerms: false,
      acceptDataProcessing: false,
    },
  });

  const watchAllConsent = watch();
  const allConsented =
    watchAllConsent.confirmAccuracy &&
    watchAllConsent.consentSubmit &&
    watchAllConsent.acceptTerms &&
    watchAllConsent.acceptDataProcessing;

  const getCountryName = (code?: string) => {
    if (!code) return '—';
    try {
      return tCountries(code);
    } catch {
      return code;
    }
  };

  // Create PaymentIntent when user consents and clicks pay
  const onSubmit = async (_data: ConsentData) => {
    setPaymentError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          metadata: {
            applicantName: `${formData.firstName} ${formData.lastName}`,
            passportCountry: formData.passportCountry || '',
            passportNumber: formData.passportNumber || '',
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to initialise payment');
      }

      const { clientSecret: secret } = await res.json();
      setClientSecret(secret);
      setShowPayment(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to initialise payment';
      setPaymentError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // After Stripe payment succeeds, submit application to Firebase
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      const res = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          paymentIntentId,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Submission failed');
      }

      const { referenceNumber: ref } = await res.json();
      setReferenceNumber(ref);
      setSubmissionComplete(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save application';
      setPaymentError(msg);
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (message: string) => {
    setPaymentError(message);
  };

  // ─── Confirmation ───────────────────
  if (submissionComplete) {
    return (
      <ConfirmationScreen
        referenceNumber={referenceNumber}
        email={formData.email || ''}
      />
    );
  }

  // ─── Payment Screen ─────────────────
  if (showPayment && clientSecret) {
    return (
      <div>
        <div className="mb-8">
          <h2 className="step-title">{t('payment.title')}</h2>
          <p className="step-description">{t('payment.description')}</p>
        </div>

        {/* Payment Summary */}
        <div className="p-5 rounded-xl bg-surface-elevated/30 border border-brand-royal/30 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-brand-light/70">
              <span>{t('payment.serviceFee')}</span>
              <span>£{SERVICE_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-brand-light/70">
              <span>{t('payment.processingFee')}</span>
              <span>£{PROCESSING_FEE.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-brand-royal/30">
              <div className="flex justify-between font-semibold text-brand-light">
                <span>{t('payment.total')}</span>
                <span className="text-brand-accent">£{TOTAL.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {paymentError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-6">
            {paymentError}
          </div>
        )}

        <StripeProvider clientSecret={clientSecret}>
          <PaymentForm
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
          />
        </StripeProvider>

        {/* Back button */}
        <button
          type="button"
          onClick={() => {
            setShowPayment(false);
            setClientSecret(null);
          }}
          disabled={isProcessing}
          className="mt-4 w-full py-3 rounded-xl border border-brand-royal/50 text-brand-light/60 hover:bg-surface-elevated/30 transition-colors text-sm disabled:opacity-50"
        >
          {t('common.back')}
        </button>
      </div>
    );
  }

  // ─── Review + Consent Form ──────────
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <h2 className="step-title">{t('review.title')}</h2>
        <p className="step-description">{t('review.description')}</p>
      </div>

      {/* Review Sections */}
      <div className="space-y-4 mb-8">
        {/* Passport */}
        <ReviewSection
          title={t('review.sections.passport')}
          icon={<FileText className="w-5 h-5 text-brand-accent" />}
          onEdit={() => goToStep(0)}
          editLabel={t('review.edit')}
        >
          <DataRow label="Country" value={getCountryName(formData.passportCountry)} />
          <DataRow label="Passport Number" value={formData.passportNumber} />
          <DataRow label="Issue Date" value={formData.issueDate} />
          <DataRow label="Expiry Date" value={formData.expiryDate} />
          <DataRow label="Issuing Authority" value={formData.issuingAuthority} />
        </ReviewSection>

        {/* Personal */}
        <ReviewSection
          title={t('review.sections.personal')}
          icon={<User className="w-5 h-5 text-brand-accent" />}
          onEdit={() => goToStep(1)}
          editLabel={t('review.edit')}
        >
          <DataRow label="Name" value={`${formData.firstName} ${formData.lastName}`} />
          <DataRow label="Date of Birth" value={formData.dateOfBirth} />
          <DataRow label="Gender" value={formData.gender} />
          <DataRow label="Nationality" value={getCountryName(formData.nationality)} />
          <DataRow label="Birth Country" value={getCountryName(formData.birthCountry)} />
        </ReviewSection>

        {/* Contact */}
        <ReviewSection
          title={t('review.sections.contact')}
          icon={<Mail className="w-5 h-5 text-brand-accent" />}
          onEdit={() => goToStep(2)}
          editLabel={t('review.edit')}
        >
          <DataRow label="Email" value={formData.email} />
          <DataRow label="Phone" value={formData.phone} />
        </ReviewSection>

        {/* Photo */}
        <ReviewSection
          title={t('review.sections.photo')}
          icon={<Camera className="w-5 h-5 text-brand-accent" />}
          onEdit={() => goToStep(3)}
          editLabel={t('review.edit')}
        >
          {formData.selfiePhoto ? (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>Photo uploaded</span>
            </div>
          ) : (
            <span className="text-red-400">No photo uploaded</span>
          )}
        </ReviewSection>

        {/* Background */}
        <ReviewSection
          title={t('review.sections.background')}
          icon={<ClipboardCheck className="w-5 h-5 text-brand-accent" />}
          onEdit={() => goToStep(4)}
          editLabel={t('review.edit')}
        >
          <DataRow
            label="Criminal convictions"
            value={formData.criminalConvictions === 'yes' ? 'Yes' : 'No'}
          />
          <DataRow
            label="Immigration breaches"
            value={formData.immigrationBreaches === 'yes' ? 'Yes' : 'No'}
          />
          <DataRow
            label="Previous refusals"
            value={formData.previousRefusals === 'yes' ? 'Yes' : 'No'}
          />
          <DataRow
            label="Terrorism involvement"
            value={formData.terrorismInvolvement === 'yes' ? 'Yes' : 'No'}
          />
        </ReviewSection>

        {/* Address */}
        <ReviewSection
          title={t('review.sections.address')}
          icon={<MapPin className="w-5 h-5 text-brand-accent" />}
          onEdit={() => goToStep(5)}
          editLabel={t('review.edit')}
        >
          <DataRow
            label="Address"
            value={`${formData.addressLine1}${formData.addressLine2 ? `, ${formData.addressLine2}` : ''}`}
          />
          <DataRow label="City" value={formData.city} />
          <DataRow label="Postcode" value={formData.postcode} />
          <DataRow label="Country" value={getCountryName(formData.country)} />
        </ReviewSection>

        {/* Emergency */}
        <ReviewSection
          title={t('review.sections.emergency')}
          icon={<Heart className="w-5 h-5 text-brand-accent" />}
          onEdit={() => goToStep(6)}
          editLabel={t('review.edit')}
        >
          {formData.emergencyName ? (
            <>
              <DataRow label="Name" value={formData.emergencyName} />
              <DataRow label="Relationship" value={formData.emergencyRelationship} />
              <DataRow label="Phone" value={formData.emergencyPhone} />
            </>
          ) : (
            <span className="text-brand-light/50">{t('review.notProvided')}</span>
          )}
        </ReviewSection>
      </div>

      {/* Consent Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-brand-light mb-4">{t('review.consent.title')}</h3>
        <div className="space-y-3">
          {(
            [
              { name: 'confirmAccuracy', label: t('review.consent.accuracy') },
              { name: 'consentSubmit', label: t('review.consent.submit') },
              { name: 'acceptTerms', label: t('review.consent.terms') },
              { name: 'acceptDataProcessing', label: t('review.consent.dataProcessing') },
            ] as const
          ).map(({ name, label }) => (
            <div key={name}>
              <label className="flex items-start gap-3 p-4 rounded-xl bg-surface-elevated/30 border border-brand-royal/30 cursor-pointer hover:border-brand-muted/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(name)}
                  className="checkbox-field mt-0.5"
                />
                <span className="text-brand-light/80 text-sm">{label}</span>
              </label>
              {errors[name] && (
                <p className="input-error mt-1">
                  {t(errors[name]?.message as string)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="p-6 rounded-xl bg-surface-card border border-brand-royal/30 mb-8">
        <h3 className="text-lg font-medium text-brand-light mb-4">{t('payment.title')}</h3>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-brand-light/70">
            <span>{t('payment.serviceFee')}</span>
            <span>£{SERVICE_FEE.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-brand-light/70">
            <span>{t('payment.processingFee')}</span>
            <span>£{PROCESSING_FEE.toFixed(2)}</span>
          </div>
          <div className="pt-3 border-t border-brand-royal/30">
            <div className="flex justify-between text-lg font-semibold text-brand-light">
              <span>{t('payment.total')}</span>
              <span className="text-brand-accent">£{TOTAL.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-elevated/30">
          <CreditCard className="w-5 h-5 text-brand-muted" />
          <span className="text-brand-light/60 text-sm">{t('payment.methods')}</span>
        </div>

        <div className="flex items-center gap-2 mt-4 text-brand-light/50 text-xs">
          <Lock className="w-4 h-4" />
          <span>{t('payment.secure')}</span>
        </div>
      </div>

      {paymentError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-6">
          {paymentError}
        </div>
      )}

      {/* Submit button - creates PaymentIntent then shows Stripe form */}
      <button
        type="submit"
        disabled={!allConsented || isSubmitting}
        className={cn(
          'w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2',
          !allConsented || isSubmitting
            ? 'bg-brand-accent/30 text-surface-dark/50 cursor-not-allowed'
            : 'bg-brand-accent hover:bg-brand-accent/90 text-surface-dark'
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t('common.loading')}
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            {t('payment.submit')}
          </>
        )}
      </button>
    </form>
  );
}
