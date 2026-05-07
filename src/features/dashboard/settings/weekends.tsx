'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Weekends() {
  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Нерабочие дни</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <Calendar
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
        <Button>Сохранить</Button>
      </CardFooter>
    </Card>
  );
}
