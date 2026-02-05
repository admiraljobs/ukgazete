'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormContext } from '@/lib/form-context';
import { personalSchema, PersonalData } from '@/lib/validations';
import { FormNavigation } from '../FormNavigation';
import { COUNTRIES } from '@/lib/utils';

export function PersonalStep() {
  const t = useTranslations();
  const tCountries = useTranslations('countries');
  const { formData, updateFormData, nextStep, markStepComplete, currentStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalData>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      dateOfBirth: formData.dateOfBirth || '',
      gender: formData.gender || undefined,
      nationality: formData.nationality || '',
      birthCountry: formData.birthCountry || '',
    },
  });

  const onSubmit = (data: PersonalData) => {
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
        <h2 className="step-title">{t('personal.title')}</h2>
        <p className="step-description">{t('personal.description')}</p>
      </div>

      <div className="space-y-6">
        {/* Name fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">
              {t('personal.firstName')} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              {...register('firstName')}
              placeholder={t('personal.firstNamePlaceholder')}
              className="input-field"
            />
            {errors.firstName && (
              <p className="input-error">{getErrorMessage(errors.firstName.message)}</p>
            )}
          </div>
          <div>
            <label className="input-label">
              {t('personal.lastName')} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              {...register('lastName')}
              placeholder={t('personal.lastNamePlaceholder')}
              className="input-field"
            />
            {errors.lastName && (
              <p className="input-error">{getErrorMessage(errors.lastName.message)}</p>
            )}
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="input-label">
            {t('personal.dateOfBirth')} <span className="text-red-400">*</span>
          </label>
          <input type="date" {...register('dateOfBirth')} className="input-field max-w-xs" />
          {errors.dateOfBirth && (
            <p className="input-error">{getErrorMessage(errors.dateOfBirth.message)}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="input-label">
            {t('personal.gender')} <span className="text-red-400">*</span>
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {(['male', 'female', 'other'] as const).map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 p-4 rounded-xl bg-surface-elevated/30 border border-brand-royal/30 hover:border-brand-muted/50 cursor-pointer transition-all has-[:checked]:border-brand-accent has-[:checked]:bg-brand-accent/10"
              >
                <input
                  type="radio"
                  value={option}
                  {...register('gender')}
                  className="radio-field"
                />
                <span className="text-brand-light">
                  {t(`personal.gender${option.charAt(0).toUpperCase() + option.slice(1)}`)}
                </span>
              </label>
            ))}
          </div>
          {errors.gender && (
            <p className="input-error">{getErrorMessage(errors.gender.message)}</p>
          )}
        </div>

        {/* Nationality & Birth Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">
              {t('personal.nationality')} <span className="text-red-400">*</span>
            </label>
            <select {...register('nationality')} className="select-field">
              <option value="">{t('personal.nationalityPlaceholder')}</option>
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {tCountries(country.code)}
                </option>
              ))}
            </select>
            {errors.nationality && (
              <p className="input-error">{getErrorMessage(errors.nationality.message)}</p>
            )}
          </div>
          <div>
            <label className="input-label">
              {t('personal.birthCountry')} <span className="text-red-400">*</span>
            </label>
            <select {...register('birthCountry')} className="select-field">
              <option value="">{t('personal.birthCountryPlaceholder')}</option>
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {tCountries(country.code)}
                </option>
              ))}
            </select>
            {errors.birthCountry && (
              <p className="input-error">{getErrorMessage(errors.birthCountry.message)}</p>
            )}
          </div>
        </div>
      </div>

      <FormNavigation />
    </form>
  );
}
