'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, FileText, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from '@/lib/form-context';
import { passportSchema, PassportData } from '@/lib/validations';
import { FormNavigation } from '../FormNavigation';
import { COUNTRIES, cn } from '@/lib/utils';

export function PassportStep() {
  const t = useTranslations();
  const tCountries = useTranslations('countries');
  const { formData, updateFormData, nextStep, markStepComplete, currentStep } = useFormContext();
  const [uploadedFile, setUploadedFile] = useState<string | null>(
    formData.passportPhoto || null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PassportData>({
    resolver: zodResolver(passportSchema),
    defaultValues: {
      passportCountry: formData.passportCountry || '',
      passportNumber: formData.passportNumber || '',
      issueDate: formData.issueDate || '',
      expiryDate: formData.expiryDate || '',
      issuingAuthority: formData.issuingAuthority || '',
      passportPhoto: formData.passportPhoto || '',
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          setUploadedFile(base64);
          setValue('passportPhoto', base64);
        };
        reader.readAsDataURL(file);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const removeFile = () => {
    setUploadedFile(null);
    setValue('passportPhoto', '');
  };

  const onSubmit = (data: PassportData) => {
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
        <h2 className="step-title">{t('passport.title')}</h2>
        <p className="step-description">{t('passport.description')}</p>
      </div>

      <div className="space-y-6">
        {/* Passport Country */}
        <div>
          <label className="input-label">
            {t('passport.country')} <span className="text-red-400">*</span>
          </label>
          <select {...register('passportCountry')} className="select-field">
            <option value="">{t('passport.countryPlaceholder')}</option>
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {tCountries(country.code)}
              </option>
            ))}
          </select>
          {errors.passportCountry && (
            <p className="input-error">{getErrorMessage(errors.passportCountry.message)}</p>
          )}
        </div>

        {/* Passport Number */}
        <div>
          <label className="input-label">
            {t('passport.number')} <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            {...register('passportNumber')}
            placeholder={t('passport.numberPlaceholder')}
            className="input-field uppercase"
          />
          <p className="text-brand-light/40 text-xs mt-1.5">{t('passport.numberHelp')}</p>
          {errors.passportNumber && (
            <p className="input-error">{getErrorMessage(errors.passportNumber.message)}</p>
          )}
        </div>

        {/* Issue & Expiry Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">
              {t('passport.issueDate')} <span className="text-red-400">*</span>
            </label>
            <input type="date" {...register('issueDate')} className="input-field" />
            {errors.issueDate && (
              <p className="input-error">{getErrorMessage(errors.issueDate.message)}</p>
            )}
          </div>
          <div>
            <label className="input-label">
              {t('passport.expiryDate')} <span className="text-red-400">*</span>
            </label>
            <input type="date" {...register('expiryDate')} className="input-field" />
            <p className="text-brand-light/40 text-xs mt-1.5">{t('passport.expiryHelp')}</p>
            {errors.expiryDate && (
              <p className="input-error">{getErrorMessage(errors.expiryDate.message)}</p>
            )}
          </div>
        </div>

        {/* Issuing Authority */}
        <div>
          <label className="input-label">
            {t('passport.authority')} <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            {...register('issuingAuthority')}
            placeholder={t('passport.authorityPlaceholder')}
            className="input-field"
          />
          {errors.issuingAuthority && (
            <p className="input-error">{getErrorMessage(errors.issuingAuthority.message)}</p>
          )}
        </div>

        {/* Passport Photo Upload */}
        <div>
          <label className="input-label">
            {t('passport.photo')} <span className="text-red-400">*</span>
          </label>
          <p className="text-brand-light/50 text-sm mb-3">{t('passport.photoDescription')}</p>

          {!uploadedFile ? (
            <div
              {...getRootProps()}
              className={cn(
                'upload-zone',
                isDragActive && 'upload-zone-active'
              )}
            >
              <input {...getInputProps()} />
              <Upload className="w-10 h-10 text-brand-muted mx-auto mb-4" />
              <p className="text-brand-light/70 mb-2">{t('passport.uploadButton')}</p>
              <p className="text-brand-light/40 text-sm">{t('passport.uploadFormats')}</p>
            </div>
          ) : (
            <div className="relative p-4 bg-surface-elevated/50 rounded-xl border border-brand-muted/30">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-brand-muted/20 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-brand-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-brand-light font-medium">Passport Photo Uploaded</p>
                  <p className="text-brand-light/50 text-sm">Click to preview or remove</p>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          <p className="text-brand-light/40 text-xs mt-2">{t('passport.photoRequirements')}</p>
        </div>
      </div>

      <FormNavigation />
    </form>
  );
}
