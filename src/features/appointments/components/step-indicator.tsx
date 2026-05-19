'use client';

import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { steps } from '../steps';

export default function StepperIndicator({ currentStepId }: { currentStepId: string }) {
  const currentIndex = steps.findIndex(s => s.id === currentStepId);

  return (
    <ol className="relative flex w-full justify-between" aria-label="Этапы записи">
      {steps.map((step, index) => {
        const isActive = index === currentIndex
        const isComplete = index < currentIndex
        const isDone = isComplete || (index === steps.length - 1 && currentStepId === "success")
        const isLast = index === steps.length - 1
    
        let status = "Ожидание"
        if (isDone) status = "Завершено"
        else if (isActive) status = "В процессе"
    
        return (
          <li key={step.id} className="relative flex flex-1 flex-col items-center">
            {/* Контейнер для кружка и абсолютной линии */}
            <div className="relative flex items-center justify-center w-full">
              {/* Тонкая серая линия, которая позиционируется абсолютно ПОЗАДИ кружков */}
              {!isLast ? (
                <div
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-y-1/2 w-full h-px transition-colors z-0",
                    isComplete ? "bg-blue-600" : "bg-[#e4e4e7]",
                  )}
                />
              ) : null}
    
              {/* Кружок с цифрой или галочкой */}
              <div
                className={cn(
                  "relative flex size-9 shrink-0 items-center justify-center rounded-full font-medium transition-colors z-10",
                  isActive || isDone ? "bg-blue-600 text-white" : "bg-[#f4f4f5] text-[#a1a1aa]",
                )}
                aria-current={isActive ? "step" : undefined}
              >
                {isActive || isDone ? (
                  <CheckIcon className="size-4" strokeWidth={3} />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
            </div>
    
            {/* Текстовый блок строго по центру */}
            <div className="mt-3 text-center w-full px-1">
              <p className="text-[10px] font-medium tracking-widest text-[#a1a1aa] uppercase">
                Шаг {index + 1}
              </p>
              <p
                className={cn(
                  "mt-0.5 text-xs font-bold leading-tight break-words",
                  isActive || isDone ? "text-[#18181b]" : "text-[#71717a]",
                )}
              >
                {step.title}
              </p>
              <p
                className={cn(
                  "mt-0.5 text-[11px] font-medium",
                  isActive ? "text-blue-600" : "text-[#a1a1aa]",
                )}
              >
                {status}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  );
}
