'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import StepperIndicator from './components/step-indicator';
import { DetailsStep, OtpStep, SuccessStep } from './components/steps';
import { useStepper } from './steps';
import { DegreeProgramsResponse } from './types';

export default function AppointmentsSteps({ initialData }: { initialData: DegreeProgramsResponse }) {
  const stepper = useStepper();
  const currentStep = stepper.state.current.data;
  return (
    <Card className="w-full max-w-xl overflow-hidden rounded-2xl! border-0! bg-white shadow-xl before:hidden before:content-none after:hidden after:content-none">
      <CardHeader className="space-y-8 px-2 py-6 sm:px-12 sm:pt-12">
        <StepperIndicator currentStepId={currentStep.id} />
      </CardHeader>
      <CardContent className="px-2 pt-4 pb-6 sm:px-12 sm:pt-6 sm:pb-16">
        {stepper.flow.switch({
          details: () => <DetailsStep stepper={stepper} />,
          otp: () => <OtpStep stepper={stepper} />,
          success: () => <SuccessStep />,
        })}
      </CardContent>
    </Card>
  );
}
