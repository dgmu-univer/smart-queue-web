'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { type FetchDegreeListResponse } from '../api/types';
import BookingStep, { type BookingStepMeta, type BookingStepNextHandler } from '../components/booking-step/booking-step';
import ConfirmationStep from '../components/confirmation-step/confirmation-step';
import EnrollmentStepIndicator from '../components/enrollment-step-indicator';
import VerificationStep, { type VerificationStepNextHandler } from '../components/verification-step/verification-step';
import { Scoped, steps, useStepper } from '../lib/stepperize';

export default function EnrollmentForm({ initialData }: { initialData: FetchDegreeListResponse }) {
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
            booking: () => <BookingStep onNext={onBookingStepNext} degreeList={initialData.degreePrograms} />,
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
                meta={stepper.metadata.values.confirmation}
              />
            ),
          })}
        </CardContent>
      </Scoped>
    </Card>
  );
}
