'use client';

import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { useFormContext } from '@/lib/form-context';
import { FORM_STEPS } from '@/lib/validations';
import { cn } from '@/lib/utils';

const stepIcons = {
  passport: '🛂',
  personal: '👤',
  contact: '📧',
  photo: '📷',
  background: '📋',
  address: '🏠',
  emergency: '🆘',
  review: '✓',
};

export function ProgressBar() {
  const t = useTranslations('progress');
  const { currentStep, completedSteps, goToStep } = useFormContext();

  return (
    <div className="mb-8 md:mb-12">
      {/* Mobile: Simple progress indicator */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-brand-light/60 text-sm">
            {t('step', { current: currentStep + 1, total: FORM_STEPS.length })}
          </span>
          <span className="text-brand-accent font-medium text-sm">
            {t(FORM_STEPS[currentStep].id)}
          </span>
        </div>
        <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-accent to-brand-muted transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / FORM_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: Full step indicator */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {FORM_STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isComplete = completedSteps.has(index);
            const isPast = index < currentStep;
            const canClick = isPast || isComplete;

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step circle */}
                <button
                  onClick={() => canClick && goToStep(index)}
                  disabled={!canClick}
                  className={cn(
                    'relative flex flex-col items-center group',
                    canClick && 'cursor-pointer'
                  )}
                >
                  <div
                    className={cn(
                      'progress-step transition-all duration-300',
                      isActive && 'progress-step-active scale-110',
                      isComplete && !isActive && 'progress-step-complete',
                      !isActive && !isComplete && 'progress-step-pending'
                    )}
                  >
                    {isComplete && !isActive ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{stepIcons[step.id as keyof typeof stepIcons]}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      'mt-2 text-xs font-medium transition-colors',
                      isActive && 'text-brand-accent',
                      !isActive && 'text-brand-light/50 group-hover:text-brand-light/70'
                    )}
                  >
                    {t(step.id)}
                  </span>
                </button>

                {/* Connector line */}
                {index < FORM_STEPS.length - 1 && (
                  <div className="flex-1 mx-2">
                    <div className="h-0.5 bg-surface-elevated rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full bg-brand-muted transition-all duration-500',
                          (isPast || isComplete) && 'w-full',
                          !isPast && !isComplete && 'w-0'
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
