'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ETAFormData, FORM_STEPS, StepId } from './validations';

interface FormContextType {
  currentStep: number;
  formData: Partial<ETAFormData>;
  setFormData: (data: Partial<ETAFormData>) => void;
  updateFormData: (data: Partial<ETAFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  totalSteps: number;
  currentStepId: StepId;
  completedSteps: Set<number>;
  markStepComplete: (step: number) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  paymentIntent: string | null;
  setPaymentIntent: (value: string | null) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<ETAFormData>>({});
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  const totalSteps = FORM_STEPS.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const currentStepId = FORM_STEPS[currentStep].id;

  const updateFormData = useCallback((data: Partial<ETAFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  const markStepComplete = useCallback((step: number) => {
    setCompletedSteps((prev) => new Set([...prev, step]));
  }, []);

  return (
    <FormContext.Provider
      value={{
        currentStep,
        formData,
        setFormData,
        updateFormData,
        nextStep,
        prevStep,
        goToStep,
        isFirstStep,
        isLastStep,
        totalSteps,
        currentStepId,
        completedSteps,
        markStepComplete,
        isSubmitting,
        setIsSubmitting,
        paymentIntent,
        setPaymentIntent,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}
