'use client';

import { Stepper } from '@stepperize/react';

export default function OtpStep({ stepper }: { stepper: Stepper }) {
  const meta = stepper.metadata.get('id');
  return (<button type="button" onClick={() => void stepper.navigation.next()}>{meta}</button>);
}
