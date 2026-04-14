'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, Info } from 'lucide-react';
import { useFormContext } from '@/lib/form-context';
import { backgroundSchema, BackgroundData } from '@/lib/validations';
import { FormNavigation } from '../FormNavigation';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: string;
  help: string;
  name: keyof BackgroundData;
  register: any;
  error?: string;
  t: (key: string) => string;
}

function QuestionCard({ question, help, name, register, error, t }: QuestionCardProps) {
  return (
    <div className="p-5 rounded-xl bg-surface-elevated border border-brand-royal">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <p className="text-brand-dark font-medium">{question}</p>
          <p className="text-brand-muted text-sm mt-1">{help}</p>
        </div>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-brand-royal cursor-pointer transition-all has-[:checked]:border-brand-accent has-[:checked]:bg-brand-accent/10">
            <input
              type="radio"
              value="yes"
              {...register(name)}
              className="radio-field"
            />
            <span className="text-brand-dark text-sm font-medium">{t('common.yes')}</span>
          </label>
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-brand-royal cursor-pointer transition-all has-[:checked]:border-brand-accent has-[:checked]:bg-brand-accent/10">
            <input
              type="radio"
              value="no"
              {...register(name)}
              className="radio-field"
            />
            <span className="text-brand-dark text-sm font-medium">{t('common.no')}</span>
          </label>
        </div>
      </div>
      {error && <p className="input-error mt-2">{error}</p>}
    </div>
  );
}

export function BackgroundStep() {
  const t = useTranslations();
  const { formData, updateFormData, nextStep, markStepComplete, currentStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BackgroundData>({
    resolver: zodResolver(backgroundSchema),
    defaultValues: {
      criminalConvictions: formData.criminalConvictions || undefined,
      immigrationBreaches: formData.immigrationBreaches || undefined,
      previousRefusals: formData.previousRefusals || undefined,
      terrorismInvolvement: formData.terrorismInvolvement || undefined,
    },
  });

  const onSubmit = (data: BackgroundData) => {
    updateFormData(data);
    markStepComplete(currentStep);
    nextStep();
  };

  const getErrorMessage = (key: string | undefined) => {
    if (!key) return undefined;
    return t(key);
  };

  const questions = [
    {
      name: 'criminalConvictions' as const,
      question: t('background.criminal.question'),
      help: t('background.criminal.help'),
    },
    {
      name: 'immigrationBreaches' as const,
      question: t('background.immigration.question'),
      help: t('background.immigration.help'),
    },
    {
      name: 'previousRefusals' as const,
      question: t('background.refusal.question'),
      help: t('background.refusal.help'),
    },
    {
      name: 'terrorismInvolvement' as const,
      question: t('background.terrorism.question'),
      help: t('background.terrorism.help'),
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Step Header */}
      <div className="mb-8">
        <h2 className="step-title">{t('background.title')}</h2>
        <p className="step-description">{t('background.description')}</p>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 mb-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm">{t('background.disclaimer')}</p>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q) => (
          <QuestionCard
            key={q.name}
            question={q.question}
            help={q.help}
            name={q.name}
            register={register}
            error={getErrorMessage(errors[q.name]?.message)}
            t={t}
          />
        ))}
      </div>

      {/* Warning */}
      <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm font-medium">{t('background.warning')}</p>
        </div>
      </div>

      <FormNavigation />
    </form>
  );
}
