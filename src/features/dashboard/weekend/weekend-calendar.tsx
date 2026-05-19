'use client';
import { useState, useTransition } from 'react';
import { parse } from 'date-fns';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { API_DATE_FORMAT, disabledMonth } from '@/lib/date';

import { updateWeekendActions } from './actions';

const parsedDates = (initialData: string[]) => initialData.map(date =>
  parse(date, API_DATE_FORMAT, new Date()),
);

export default function WeekendsCalendar({ initialData }: { initialData: string[] }) {
  const [weekends, setWeekends] = useState<Date[]>(parsedDates(initialData));
  const [isPending, startTransition] = useTransition();

  const handleSelect = (newSelected: Date[] | undefined) => {
    if (Array.isArray(newSelected)) {
      setWeekends(newSelected);
    } else {
      setWeekends([]);
    }
  };

  const handleUpdate = () => {
    startTransition(async () => {
      const result = await updateWeekendActions(weekends);
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
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Нерабочие дни</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <Calendar
          selected={weekends}
          onSelect={handleSelect}
          mode="multiple"
          captionLayout="dropdown"
          numberOfMonths={3}
          showOutsideDays={false}
          className="rounded-lg border"
          {...disabledMonth}
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            handleUpdate();
          }}
          loading={isPending}
        >
          Сохранить
        </Button>
      </CardFooter>
    </Card>
  );
}
