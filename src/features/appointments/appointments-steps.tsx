'use client';

import { Card } from '@radix-ui/themes';

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import DetailsStep from './components/details-step';
import OtpStep from './components/otp-step';
import StepperIndicator from './components/step-indicator';
import SuccessStep from './components/success-step';
import { useStepper } from './steps';

export default function AppointmentsSteps() {
  const stepper = useStepper();
  const currentStep = stepper.state.current.data;
  return (
    <Card className="bg-background/80 w-full max-w-xl border-0 shadow-xl backdrop-blur-sm">
      <CardHeader>
        <StepperIndicator currentStepId={currentStep.id} />
        <CardTitle className="mt-4 text-2xl text-balance">{currentStep.title}</CardTitle>
        <CardDescription>{currentStep.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {stepper.flow.switch({
          details: () => <DetailsStep />,
          otp: () => <OtpStep />,
          success: () => <SuccessStep />,
        })}
      </CardContent>
    </Card>
  );
}
