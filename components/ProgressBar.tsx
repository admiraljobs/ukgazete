'use client';

import { useTranslations } from 'next-intl';
import { Check, FileText, Mail, ShieldCheck, Star } from 'lucide-react';
import { useFormContext } from '@/lib/form-context';
import { FORM_STEPS } from '@/lib/validations';
import { cn } from '@/lib/utils';

const PHASES = [
  {
    id: 'identity',
    labelKey: 'phase.identity',
    icon: FileText,
    steps: [0, 1], // passport, personal
  },
  {
    id: 'contact',
    labelKey: 'phase.contact',
    icon: Mail,
    steps: [2, 3], // contact, photo
  },
  {
    id: 'security',
    labelKey: 'phase.security',
    icon: ShieldCheck,
    steps: [4, 5], // background, address
  },
  {
    id: 'review',
    labelKey: 'phase.review',
    icon: Star,
    steps: [6, 7], // emergency, review
  },
] as const;

export function ProgressBar() {
  const t = useTranslations('progress');
  const { currentStep, completedSteps, goToStep } = useFormContext();

  const currentPhaseIndex = PHASES.findIndex((p) =>
    (p.steps as readonly number[]).includes(currentStep)
  );
  const currentPhase = PHASES[currentPhaseIndex];
  const stepWithinPhase =
    (currentPhase.steps as readonly number[]).indexOf(currentStep) + 1;
  const stepsInPhase = currentPhase.steps.length;

  return (
    <div className="mb-8 md:mb-10">
      {/* Mobile: compact phase + sub-step indicator */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-brand-dark font-semibold text-sm">
              {t(currentPhase.labelKey)}
            </span>
            <span className="text-brand-muted text-xs ml-2">
              {t('phaseStep', {
                current: stepWithinPhase,
                total: stepsInPhase,
              })}
            </span>
          </div>
          <span className="text-brand-muted text-xs bg-surface-elevated px-2.5 py-1 rounded-full">
            {t('phaseOf', {
              current: currentPhaseIndex + 1,
              total: PHASES.length,
            })}
          </span>
        </div>
        <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-accent to-brand-muted transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep + 1) / FORM_STEPS.length) * 100}%`,
            }}
          />
        </div>
        {/* Sub-step dots within current phase */}
        <div className="flex justify-end gap-1.5 mt-2">
          {currentPhase.steps.map((s) => (
            <div
              key={s}
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-all duration-300',
                s === currentStep
                  ? 'bg-brand-accent w-4'
                  : s < currentStep
                  ? 'bg-green-500'
                  : 'bg-brand-royal'
              )}
            />
          ))}
        </div>
      </div>

      {/* Desktop: 4-phase stepper */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {PHASES.map((phase, phaseIndex) => {
            const phaseComplete = phase.steps.every(
              (s) => s < currentStep || completedSteps.has(s)
            );
            const phaseActive = (phase.steps as readonly number[]).includes(
              currentStep
            );
            const phasePast = phase.steps[phase.steps.length - 1] < currentStep;
            const canClick = phasePast || phaseComplete;
            const Icon = phase.icon;

            return (
              <div key={phase.id} className="flex items-center flex-1">
                <button
                  onClick={() => canClick && goToStep(phase.steps[0])}
                  disabled={!canClick}
                  className={cn(
                    'relative flex flex-col items-center group',
                    canClick ? 'cursor-pointer' : 'cursor-default'
                  )}
                >
                  {/* Circle */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
                      phaseActive &&
                        'bg-brand-accent text-white shadow-lg shadow-brand-accent/25 scale-110',
                      phaseComplete &&
                        !phaseActive &&
                        'bg-green-500 text-white',
                      !phaseActive &&
                        !phaseComplete &&
                        'bg-white border-2 border-brand-royal text-brand-muted'
                    )}
                  >
                    {phaseComplete && !phaseActive ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>

                  {/* Phase label */}
                  <span
                    className={cn(
                      'mt-2 text-xs font-medium transition-colors text-center leading-tight max-w-[80px]',
                      phaseActive && 'text-brand-accent',
                      !phaseActive &&
                        phaseComplete &&
                        'text-green-600',
                      !phaseActive &&
                        !phaseComplete &&
                        'text-brand-muted'
                    )}
                  >
                    {t(phase.labelKey)}
                  </span>

                  {/* Sub-step indicator for active phase */}
                  {phaseActive && (
                    <div className="flex gap-1 mt-1.5">
                      {phase.steps.map((s) => (
                        <div
                          key={s}
                          className={cn(
                            'w-1.5 h-1.5 rounded-full transition-all duration-300',
                            s === currentStep
                              ? 'bg-brand-accent'
                              : s < currentStep
                              ? 'bg-green-500'
                              : 'bg-brand-royal'
                          )}
                        />
                      ))}
                    </div>
                  )}
                </button>

                {/* Connector line */}
                {phaseIndex < PHASES.length - 1 && (
                  <div className="flex-1 mx-3 mt-[-20px]">
                    <div className="h-0.5 bg-brand-royal rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full bg-brand-accent transition-all duration-500',
                          phaseComplete ? 'w-full' : 'w-0'
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Phase context label */}
        <p className="text-center text-xs text-brand-muted mt-4">
          {t('phaseOf', {
            current: currentPhaseIndex + 1,
            total: PHASES.length,
          })}{' '}
          &mdash;{' '}
          {t('stepDetail', {
            current: stepWithinPhase,
            total: stepsInPhase,
            step: t(FORM_STEPS[currentStep].id),
          })}
        </p>
      </div>
    </div>
  );
}
