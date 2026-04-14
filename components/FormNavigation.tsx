'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useFormContext } from '@/lib/form-context';
import { cn } from '@/lib/utils';

interface FormNavigationProps {
  onSubmit?: () => void;
  isLoading?: boolean;
  showBack?: boolean;
  nextLabel?: string;
}

export function FormNavigation({ 
  onSubmit, 
  isLoading = false, 
  showBack = true,
  nextLabel 
}: FormNavigationProps) {
  const t = useTranslations('common');
  const { prevStep, isFirstStep, isLastStep } = useFormContext();

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-royal/30">
      {/* Back button */}
      {showBack && !isFirstStep ? (
        <button
          type="button"
          onClick={prevStep}
          className="btn-secondary flex items-center gap-2"
          disabled={isLoading}
        >
          <ArrowLeft className="w-4 h-4 rtl-flip" />
          <span>{t('back')}</span>
        </button>
      ) : (
        <div />
      )}

      {/* Next/Submit button */}
      <button
        type="submit"
        onClick={onSubmit}
        disabled={isLoading}
        className={cn(
          'btn-primary flex items-center gap-2 min-w-[160px] justify-center',
          isLoading && 'opacity-70 cursor-not-allowed'
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{t('loading')}</span>
          </>
        ) : (
          <>
            <span>{nextLabel || (isLastStep ? t('submit') : t('next'))}</span>
            {!isLastStep && <ArrowRight className="w-4 h-4 rtl-flip" />}
          </>
        )}
      </button>
    </div>
  );
}
