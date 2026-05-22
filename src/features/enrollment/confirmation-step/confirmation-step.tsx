'use client';

interface ConfirmationStepProps {
  onReset: () => void,
}

export default function ConfirmationStep({ onReset }: ConfirmationStepProps) {
  return (
    <button type="button" onClick={onReset}>
      {' '}
      ConfirmationStep
    </button>
  );
}
