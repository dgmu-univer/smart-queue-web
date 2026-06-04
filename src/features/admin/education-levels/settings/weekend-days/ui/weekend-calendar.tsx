'use client';

import { useState, useTransition } from 'react';
import { format, isValid, parse } from 'date-fns';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { API_DATE_FORMAT, disabledMonth } from '@/lib/date';

import { WithLevelId } from '../../../api.types';
import { updateWeekendActions } from '../api/update-weekend';

const parsedDates = (initialData: string[]) => initialData.map(date =>
  parse(date, API_DATE_FORMAT, new Date()),
);

type ComponentProps = WithLevelId<{ initialData: string[] }>;

export default function WeekendsCalendar({ initialData, levelId }: ComponentProps) {
  const [weekends, setWeekends] = useState<Date[]>(parsedDates(initialData));
  const [isPending, startTransition] = useTransition();

  const onSelectWeekends = (weekends: Date[] | undefined) => {
    if (Array.isArray(weekends)) {
      setWeekends(weekends);
    } else {
      setWeekends([]);
    }
  };

  const handleUpdate = () => {
    startTransition(async () => {
      const payload = weekends
        .filter(date => isValid(date)) // Исключаем невалидные даты, чтобы format() не упал с ошибкой
        .map(date => format(date, API_DATE_FORMAT));

      const result = await updateWeekendActions(levelId, payload);
      if (result.success) {
        toast.success('Выходные дни успешно обновлены!');
      } else {
        toast.error(`Что-то пошло не так! (${result.error.status.toString()})`, {
          description: result.error.message,
          descriptionClassName: 'text-foreground',
        });
      }
    });
  };

  return (
    <Card className="border-border border shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground text-base font-semibold">Нерабочие дни</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Calendar
          selected={weekends}
          onSelect={onSelectWeekends}
          mode="multiple"
          captionLayout="dropdown"
          numberOfMonths={3}
          showOutsideDays={false}
          className="rounded-lg border"
          {...disabledMonth}
        />
        <div>
          <Button
            onClick={() => {
              handleUpdate();
            }}
            loading={isPending}
            size="sm"
          >
            Сохранить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
