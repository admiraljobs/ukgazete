'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useFormContext } from '@/lib/form-context';
import { PassportStep } from './form-steps/PassportStep';
import { PersonalStep } from './form-steps/PersonalStep';
import { ContactStep } from './form-steps/ContactStep';
import { PhotoStep } from './form-steps/PhotoStep';
import { BackgroundStep } from './form-steps/BackgroundStep';
import { AddressStep } from './form-steps/AddressStep';
import { EmergencyStep } from './form-steps/EmergencyStep';
import { ReviewStep } from './form-steps/ReviewStep';

const stepComponents = {
  passport: PassportStep,
  personal: PersonalStep,
  contact: ContactStep,
  photo: PhotoStep,
  background: BackgroundStep,
  address: AddressStep,
  emergency: EmergencyStep,
  review: ReviewStep,
};

export function FormWizard() {
  const { currentStepId, currentStep } = useFormContext();
  const StepComponent = stepComponents[currentStepId];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="form-card p-6 md:p-10">
          <StepComponent />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
