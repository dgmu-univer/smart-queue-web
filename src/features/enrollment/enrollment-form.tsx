'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { AppointmentVerifyResponse, GetDegreeProgramsResponse } from './api/types';
import BookingStep, { type BookingStepMeta, type BookingStepNextHandler } from './booking-step/booking-step';
import ConfirmationStep from './confirmation-step/confirmation-step';
import VerificationStep, { type VerificationStepNextHandler } from './verification-step/verification-step';
import EnrollmentStepIndicator from './enrollment-step-indicator';
import { Scoped, steps, useStepper } from './stepperize';

export default function EnrollmentForm({ initialData }: { initialData: GetDegreeProgramsResponse }) {
  const stepper = useStepper();
  const currentStep = stepper.state.current.data;

  const onBookingStepNext: BookingStepNextHandler = ({ bookingId, phone }) => {
    stepper.metadata.set('verification', { bookingId, phone });
    void stepper.navigation.next();
  };

  const onVerificationStepNext: VerificationStepNextHandler = (confirmation) => {
    stepper.metadata.set('confirmation', confirmation);
    void stepper.navigation.next();
  };

  const onVerificationStepBack = () => {
    void stepper.navigation.prev();
  };

  const onConfirmationStepReset = () => {
    stepper.navigation.reset();
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
            verification: () => (
              <VerificationStep
                meta={stepper.metadata.values.verification as BookingStepMeta}
                onNext={onVerificationStepNext}
                onBack={onVerificationStepBack}
              />
            ),
            confirmation: () => (
              <ConfirmationStep
                onReset={onConfirmationStepReset}
                meta={stepper.metadata.values.confirmation as AppointmentVerifyResponse}
              />
            ),
          })}
        </CardContent>
      </Scoped>
    </Card>
  );
}
