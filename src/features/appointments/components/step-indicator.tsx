'use client';

import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { steps } from '../steps';

export default function StepperIndicator({ currentStepId }: { currentStepId: string }) {
  const currentIndex = steps.findIndex(s => s.id === currentStepId);

  return (
    <ol className="flex items-center gap-2" aria-label="Этапы записи">
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const isComplete = index < currentIndex;
        return (
          <li key={step.id} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors',
                isComplete && 'border-foreground bg-foreground text-background',
                isActive && 'border-foreground bg-background text-foreground',
                !isActive && !isComplete && 'border-border bg-background text-muted-foreground',
              )}
              aria-current={isActive ? 'step' : undefined}
            >
              {isComplete ? <CheckIcon className="size-3.5" /> : index + 1}
            </div>
            {index < steps.length - 1
              ? (
                  <div
                    className={cn(
                      'h-px flex-1 transition-colors',
                      isComplete ? 'bg-foreground' : 'bg-border',
                    )}
                  />
                )
              : null}
          </li>
        );
      })}
    </ol>
  );
}
