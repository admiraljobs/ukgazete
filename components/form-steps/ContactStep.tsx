'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone } from 'lucide-react';
import { useFormContext } from '@/lib/form-context';
import { contactSchema, ContactData } from '@/lib/validations';
import { FormNavigation } from '../FormNavigation';

export function ContactStep() {
  const t = useTranslations();
  const { formData, updateFormData, nextStep, markStepComplete, currentStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: formData.email || '',
      confirmEmail: formData.confirmEmail || '',
      phone: formData.phone || '',
    },
  });

  const onSubmit = (data: ContactData) => {
    updateFormData(data);
    markStepComplete(currentStep);
    nextStep();
  };

  const getErrorMessage = (key: string | undefined) => {
    if (!key) return undefined;
    return t(key);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Step Header */}
      <div className="mb-8">
        <h2 className="step-title">{t('contact.title')}</h2>
        <p className="step-description">{t('contact.description')}</p>
      </div>

      <div className="space-y-6">
        {/* Email Address */}
        <div>
          <label className="input-label">
            {t('contact.email')} <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
            <input
              type="email"
              {...register('email')}
              placeholder={t('contact.emailPlaceholder')}
              className="input-field pl-12"
            />
          </div>
          <p className="text-brand-light/40 text-xs mt-1.5">{t('contact.emailHelp')}</p>
          {errors.email && (
            <p className="input-error">{getErrorMessage(errors.email.message)}</p>
          )}
        </div>

        {/* Confirm Email */}
        <div>
          <label className="input-label">
            {t('contact.confirmEmail')} <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
            <input
              type="email"
              {...register('confirmEmail')}
              placeholder={t('contact.confirmEmailPlaceholder')}
              className="input-field pl-12"
              onPaste={(e) => e.preventDefault()} // Prevent paste to ensure user types email
            />
          </div>
          {errors.confirmEmail && (
            <p className="input-error">{getErrorMessage(errors.confirmEmail.message)}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="input-label">
            {t('contact.phone')} <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
            <input
              type="tel"
              {...register('phone')}
              placeholder={t('contact.phonePlaceholder')}
              className="input-field pl-12"
            />
          </div>
          <p className="text-brand-light/40 text-xs mt-1.5">{t('contact.phoneHelp')}</p>
          {errors.phone && (
            <p className="input-error">{getErrorMessage(errors.phone.message)}</p>
          )}
        </div>

        {/* Important Notice */}
        <div className="p-4 rounded-xl bg-brand-accent/10 border border-brand-accent/20">
          <div className="flex gap-3">
            <Mail className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-brand-accent font-medium text-sm">Important</p>
              <p className="text-brand-light/70 text-sm mt-1">
                Please double-check your email address. Your ETA decision and all important updates will be sent to this email.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FormNavigation />
    </form>
  );
}
