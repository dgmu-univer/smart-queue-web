'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { GetDegreeProgramsResponse } from './api/types';
import BookingStep, { type BookingStepNextHandler } from './booking-step/booking-step';
import ConfirmationStep from './confirmation-step/confirmation-step';
import VerificationStep from './verification-step/verification-step';
import EnrollmentStepIndicator from './enrollment-step-indicator';
import { Scoped, steps, useStepper } from './stepperize';

export default function EnrollmentForm({ initialData }: { initialData: GetDegreeProgramsResponse }) {
  const stepper = useStepper();
  const currentStep = stepper.state.current.data;

  const onBookingStepNext: BookingStepNextHandler = ({ bookingId }) => {
    console.log(bookingId);
    void stepper.navigation.next();
  };
  return (
    <Card className="w-full max-w-xl overflow-hidden rounded-2xl! border-0! bg-white shadow-xl before:hidden before:content-none after:hidden after:content-none">
      <Scoped>
        <CardHeader className="space-y-8 px-2 py-6 sm:px-12 sm:pt-12">
          <EnrollmentStepIndicator steps={steps} currentStepId={currentStep.id} />
        </CardHeader>
        <CardContent className="px-2 pt-4 pb-6 sm:px-12 sm:pt-6 sm:pb-16">
          {stepper.flow.switch({
            booking: () => <BookingStep onNext={onBookingStepNext} initialData={initialData} />,
            verification: () => <VerificationStep stepper={stepper} />,
            confirmation: () => <ConfirmationStep stepper={stepper} />,
          })}
        </CardContent>
      </Scoped>
    </Card>
  );
}
