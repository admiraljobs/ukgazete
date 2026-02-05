'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin } from 'lucide-react';
import { useFormContext } from '@/lib/form-context';
import { addressSchema, AddressData } from '@/lib/validations';
import { FormNavigation } from '../FormNavigation';
import { COUNTRIES } from '@/lib/utils';

export function AddressStep() {
  const t = useTranslations();
  const tCountries = useTranslations('countries');
  const { formData, updateFormData, nextStep, markStepComplete, currentStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressLine1: formData.addressLine1 || '',
      addressLine2: formData.addressLine2 || '',
      city: formData.city || '',
      state: formData.state || '',
      postcode: formData.postcode || '',
      country: formData.country || '',
    },
  });

  const onSubmit = (data: AddressData) => {
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
      <div className="mb-8">
        <h2 className="step-title">{t('address.title')}</h2>
        <p className="step-description">{t('address.description')}</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="input-label">
            {t('address.line1')} <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
            <input
              type="text"
              {...register('addressLine1')}
              placeholder={t('address.line1Placeholder')}
              className="input-field pl-12"
            />
          </div>
          {errors.addressLine1 && (
            <p className="input-error">{getErrorMessage(errors.addressLine1.message)}</p>
          )}
        </div>

        <div>
          <label className="input-label">
            {t('address.line2')} <span className="text-brand-light/40">({t('common.optional')})</span>
          </label>
          <input
            type="text"
            {...register('addressLine2')}
            placeholder={t('address.line2Placeholder')}
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">
              {t('address.city')} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              {...register('city')}
              placeholder={t('address.cityPlaceholder')}
              className="input-field"
            />
            {errors.city && (
              <p className="input-error">{getErrorMessage(errors.city.message)}</p>
            )}
          </div>
          <div>
            <label className="input-label">
              {t('address.state')} <span className="text-brand-light/40">({t('common.optional')})</span>
            </label>
            <input
              type="text"
              {...register('state')}
              placeholder={t('address.statePlaceholder')}
              className="input-field"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">
              {t('address.postcode')} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              {...register('postcode')}
              placeholder={t('address.postcodePlaceholder')}
              className="input-field"
            />
            {errors.postcode && (
              <p className="input-error">{getErrorMessage(errors.postcode.message)}</p>
            )}
          </div>
          <div>
            <label className="input-label">
              {t('address.country')} <span className="text-red-400">*</span>
            </label>
            <select {...register('country')} className="select-field">
              <option value="">{t('address.countryPlaceholder')}</option>
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {tCountries(country.code)}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="input-error">{getErrorMessage(errors.country.message)}</p>
            )}
          </div>
        </div>
      </div>

      <FormNavigation />
    </form>
  );
}
