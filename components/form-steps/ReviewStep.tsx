'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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
} from 'lucide-react';
import { useFormContext } from '@/lib/form-context';
import { consentSchema, ConsentData, FORM_STEPS } from '@/lib/validations';
import { FormNavigation } from '../FormNavigation';
import { COUNTRIES, cn } from '@/lib/utils';

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

export function ReviewStep() {
  const t = useTranslations();
  const tCountries = useTranslations('countries');
  const { formData, goToStep, isSubmitting, setIsSubmitting } = useFormContext();
  const [showPayment, setShowPayment] = useState(false);

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

  const onSubmit = async (data: ConsentData) => {
    setIsSubmitting(true);
    // Here you would integrate with Stripe Payment Element
    // For now, we'll simulate the payment flow
    setShowPayment(true);
    setIsSubmitting(false);
  };

  const getErrorMessage = (key: string | undefined) => {
    if (!key) return undefined;
    return t(key);
  };

  // Pricing
  const SERVICE_FEE = 49.99;
  const PROCESSING_FEE = 2.50;
  const TOTAL = SERVICE_FEE + PROCESSING_FEE;

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
          <DataRow label="Address" value={`${formData.addressLine1}${formData.addressLine2 ? `, ${formData.addressLine2}` : ''}`} />
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
          <label className="flex items-start gap-3 p-4 rounded-xl bg-surface-elevated/30 border border-brand-royal/30 cursor-pointer hover:border-brand-muted/50 transition-colors">
            <input
              type="checkbox"
              {...register('confirmAccuracy')}
              className="checkbox-field mt-0.5"
            />
            <span className="text-brand-light/80 text-sm">{t('review.consent.accuracy')}</span>
          </label>
          {errors.confirmAccuracy && (
            <p className="input-error">{getErrorMessage(errors.confirmAccuracy.message)}</p>
          )}

          <label className="flex items-start gap-3 p-4 rounded-xl bg-surface-elevated/30 border border-brand-royal/30 cursor-pointer hover:border-brand-muted/50 transition-colors">
            <input
              type="checkbox"
              {...register('consentSubmit')}
              className="checkbox-field mt-0.5"
            />
            <span className="text-brand-light/80 text-sm">{t('review.consent.submit')}</span>
          </label>
          {errors.consentSubmit && (
            <p className="input-error">{getErrorMessage(errors.consentSubmit.message)}</p>
          )}

          <label className="flex items-start gap-3 p-4 rounded-xl bg-surface-elevated/30 border border-brand-royal/30 cursor-pointer hover:border-brand-muted/50 transition-colors">
            <input
              type="checkbox"
              {...register('acceptTerms')}
              className="checkbox-field mt-0.5"
            />
            <span className="text-brand-light/80 text-sm">{t('review.consent.terms')}</span>
          </label>
          {errors.acceptTerms && (
            <p className="input-error">{getErrorMessage(errors.acceptTerms.message)}</p>
          )}

          <label className="flex items-start gap-3 p-4 rounded-xl bg-surface-elevated/30 border border-brand-royal/30 cursor-pointer hover:border-brand-muted/50 transition-colors">
            <input
              type="checkbox"
              {...register('acceptDataProcessing')}
              className="checkbox-field mt-0.5"
            />
            <span className="text-brand-light/80 text-sm">{t('review.consent.dataProcessing')}</span>
          </label>
          {errors.acceptDataProcessing && (
            <p className="input-error">{getErrorMessage(errors.acceptDataProcessing.message)}</p>
          )}
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

        {/* Payment methods indicator */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-elevated/30">
          <CreditCard className="w-5 h-5 text-brand-muted" />
          <span className="text-brand-light/60 text-sm">{t('payment.methods')}</span>
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-2 mt-4 text-brand-light/50 text-xs">
          <Lock className="w-4 h-4" />
          <span>{t('payment.secure')}</span>
        </div>
      </div>

      <FormNavigation 
        nextLabel={t('payment.submit')} 
        isLoading={isSubmitting}
      />
    </form>
  );
}
