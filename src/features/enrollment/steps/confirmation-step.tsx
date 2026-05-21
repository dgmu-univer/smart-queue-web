'use client';

import { UseStepper } from '../stepperize';

interface ConfirmationStepProps {
  stepper: UseStepper
}

export default function ConfirmationStep({ stepper }: ConfirmationStepProps) {
  return (
    <button type="button" onClick={() => void stepper.navigation.next()}>
      {' '}
      ConfirmationStep
    </button>
  );
}
