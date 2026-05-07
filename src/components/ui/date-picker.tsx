'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DatePickerProps {
  /** Выбранная дата (контролируемый режим) */
  value?: Date
  /** Коллбек при изменении даты */
  onChange?: (date: Date | undefined) => void
  /** Текст когда дата не выбрана */
  placeholder?: string
  /** Доп. классы на кнопку-триггер */
  className?: string
  /** Пропсы проброшенные в PopoverContent (align, side и т.д.) */
  align?: 'start' | 'center' | 'end'
  /** Формат отображаемой даты (date-fns) */
  dateFormat?: string
  /** Иконка в кнопке */
  icon?: React.ReactNode
  /** Пробросить пропсы в Calendar */
  calendarProps?: Record<string, unknown>
  /** disabled */
  disabled?: boolean
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DatePicker({
  value,
  onChange,
  placeholder = 'Выберите дату',
  className,
  align = 'start',
  dateFormat = 'PPP',
  icon = <ChevronDownIcon />,
  calendarProps,
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date);
    setOpen(false); // закрываем после выбора
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          data-empty={!value}
          className={cn(
            'data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal',
            className,
          )}
        >
          {value ? format(value, dateFormat) : <span>{placeholder}</span>}
          {icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          defaultMonth={value}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  );
}
