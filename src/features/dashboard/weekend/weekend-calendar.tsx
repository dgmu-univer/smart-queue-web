'use client';
import { useState } from 'react';
import { parse } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { API_DATE_FORMAT } from '@/lib/date';

import { updateWeekendActions } from './actions';

const parsedDates = (initialData: string[]) => initialData.map(date =>
  parse(date, API_DATE_FORMAT, new Date()),
);

export default function WeekendsCalendar({ initialData }: { initialData: string[] }) {
  const [weekends, setWeekends] = useState<Date[]>(parsedDates(initialData));
  const [isPending, setIsPending] = useState(false);

  const handleSelect = (newSelected: Date[] | undefined) => {
    if (Array.isArray(newSelected)) {
      setWeekends(newSelected);
    } else {
      setWeekends([]);
    }
  };

  const handleUpdate = async () => {
    try {
      setIsPending(true);
      await updateWeekendActions(weekends);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
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
          modifiers={{
            weekend: date => date.getDay() === 0 || date.getDay() === 6,
          }}
          // Применяем стили к этому модификатору
          modifiersStyles={{
            weekend: { color: 'red' },
          }}
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            void handleUpdate();
          }}
          loading={isPending}
        >
          Сохранить
        </Button>
      </CardFooter>
    </Card>
  );
}
