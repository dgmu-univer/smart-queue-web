'use client';

import { Card } from '@radix-ui/themes';

import { CardContent, CardHeader } from '@/components/ui/card';

import { DetailsStep, OtpStep, SuccessStep } from './components/steps';
import { useStepper } from './steps';
import { DegreeProgramsResponse } from './types';
import StepperIndicator from './components/step-indicator';

export default function AppointmentsSteps({ initialData }: { initialData: DegreeProgramsResponse }) {
  const stepper = useStepper();
  const currentStep = stepper.state.current.data;
  return (
    <Card className="w-full max-w-xl border-0! rounded-2xl! bg-white shadow-xl overflow-hidden after:hidden after:content-none before:hidden before:content-none">
      <CardHeader className="space-y-8 px-2 pb-6 pt-6 sm:px-12 sm:pt-12">
        <StepperIndicator currentStepId={currentStep.id} />
      </CardHeader>
      <CardContent className="px-2 pb-6 pt-4 sm:px-12 sm:pb-16 sm:pt-6">
        {stepper.flow.switch({
          details: () => <DetailsStep />,
          otp: () => <OtpStep />,
          success: () => <SuccessStep />,
        })}
      </CardContent>
    </Card>
  );
}
