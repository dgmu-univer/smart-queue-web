'use client';

import { UseStepper } from '../../stepperize';

interface OtpStepProps {
  stepper: UseStepper
}

export default function OtpStep({ stepper }: OtpStepProps) {
  const meta = stepper.metadata.get('id');
  return (<button type="button" onClick={() => void stepper.navigation.next()}>{meta}</button>);
}
