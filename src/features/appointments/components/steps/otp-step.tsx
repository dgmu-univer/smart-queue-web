'use client';

import { UseStepper } from '../../stepperize';

interface OtpStepProps {
  stepper: UseStepper
}

export default function OtpStep({ stepper }: OtpStepProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const meta = stepper.metadata.get('id');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return (<button type="button" onClick={() => void stepper.navigation.next()}>{meta}</button>);
}
