'use client';

import { UseStepper } from '../../stepperize';

interface SuccessStepProps {
  stepper: UseStepper
}

export default function SuccessStep({ stepper }: SuccessStepProps) {
  return (
    <button type="button" onClick={() => void stepper.navigation.next()}>
      {' '}
      SuccessStep
    </button>
  );
}
