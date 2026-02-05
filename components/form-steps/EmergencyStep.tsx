'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Phone, Heart, SkipForward } from 'lucide-react';
import { useFormContext } from '@/lib/form-context';
import { emergencySchema, EmergencyData } from '@/lib/validations';
import { FormNavigation } from '../FormNavigation';

export function EmergencyStep() {
  const t = useTranslations();
  const { formData, updateFormData, nextStep, markStepComplete, currentStep } = useFormContext();

  const {
    register,
    handleSubmit,
  } = useForm<EmergencyData>({
    resolver: zodResolver(emergencySchema),
    defaultValues: {
      emergencyName: formData.emergencyName || '',
      emergencyRelationship: formData.emergencyRelationship || '',
      emergencyPhone: formData.emergencyPhone || '',
    },
  });

  const onSubmit = (data: EmergencyData) => {
    updateFormData(data);
    markStepComplete(currentStep);
    nextStep();
  };

  const handleSkip = () => {
    updateFormData({
      emergencyName: '',
      emergencyRelationship: '',
      emergencyPhone: '',
    });
    markStepComplete(currentStep);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <h2 className="step-title">{t('emergency.title')}</h2>
        <p className="step-description">{t('emergency.description')}</p>
      </div>

      {/* Optional indicator */}
      <div className="p-4 rounded-xl bg-brand-muted/10 border border-brand-muted/20 mb-6">
        <div className="flex gap-3">
          <Heart className="w-5 h-5 text-brand-muted flex-shrink-0 mt-0.5" />
          <p className="text-brand-light/70 text-sm">
            This information is optional but recommended. It helps us contact someone on your behalf in case of emergency during your travel.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="input-label">
            {t('emergency.name')} <span className="text-brand-light/40">({t('common.optional')})</span>
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
            <input
              type="text"
              {...register('emergencyName')}
              placeholder={t('emergency.namePlaceholder')}
              className="input-field pl-12"
            />
          </div>
        </div>

        <div>
          <label className="input-label">
            {t('emergency.relationship')} <span className="text-brand-light/40">({t('common.optional')})</span>
          </label>
          <input
            type="text"
            {...register('emergencyRelationship')}
            placeholder={t('emergency.relationshipPlaceholder')}
            className="input-field"
          />
        </div>

        <div>
          <label className="input-label">
            {t('emergency.phone')} <span className="text-brand-light/40">({t('common.optional')})</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
            <input
              type="tel"
              {...register('emergencyPhone')}
              placeholder={t('emergency.phonePlaceholder')}
              className="input-field pl-12"
            />
          </div>
        </div>
      </div>

      {/* Skip option */}
      <div className="mt-8 pt-6 border-t border-brand-royal/30">
        <button
          type="button"
          onClick={handleSkip}
          className="w-full flex items-center justify-center gap-2 py-3 text-brand-light/60 hover:text-brand-light transition-colors"
        >
          <SkipForward className="w-4 h-4" />
          <span>{t('emergency.skip')}</span>
        </button>
      </div>

      <FormNavigation />
    </form>
  );
}
