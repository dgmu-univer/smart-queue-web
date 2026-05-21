'use client';

import * as React from 'react';
import { endOfDay, parseISO, startOfDay } from 'date-fns';

import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dateAsApiString } from '@/lib/date';

import { UseStepper } from '../../stepperize';
import { type DegreeProgramsResponse } from '../../types';
import { PhoneInputField } from '../phone-input';

interface DetailsStepProps {
  initialData: DegreeProgramsResponse
  stepper: UseStepper
}

export default function DetailsStep({ initialData, stepper }: DetailsStepProps) {
  const [degreeId, setDegreeId] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string | undefined>('');
  const [allSlots, setAllSlots] = React.useState<string[]>([]);
  const [slot, setSlot] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);

  const disabledMatcher = {
    before: startOfDay(parseISO(initialData.periodSettings.start_date)),
    after: endOfDay(parseISO(initialData.periodSettings.end_date)),
  };

  React.useEffect(() => {
    const getSlots = async (id: string, date: Date) => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://price05.ru/backend/api/public/slots?booked=false&degreeId=${id}&date=${dateAsApiString(date)}`);
        const data = await response.json() as { slots: string[] };
        setAllSlots(data.slots);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (degreeId && selectedDate) {
      void getSlots(degreeId, selectedDate);
    }
  }, [degreeId, selectedDate]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="education">Уровень образования</FieldLabel>
          <Select value={degreeId} onValueChange={setDegreeId}>
            <SelectTrigger id="education" className="w-full">
              <SelectValue placeholder="Выберите уровень" />
            </SelectTrigger>
            <SelectContent>
              {initialData.degreePrograms.map(option => (
                <SelectItem key={option.id} value={option.id.toString()}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Телефон</FieldLabel>
          <PhoneInputField
            id="phone"
            value={phone}
            onChange={setPhone}
            placeholder="+7 (988) 123-00-00"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="date">Дата</FieldLabel>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              calendarProps={{
                disabled: disabledMatcher,
              }} // 👈 блокировка дат вне периода
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="slot">Время</FieldLabel>
            <Select disabled={isLoading} value={slot} onValueChange={setSlot}>
              <SelectTrigger id="slot" className="w-full">
                <SelectValue placeholder="Выберите слот" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {allSlots.map(time => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isLoading && <div>Загрузка...</div>}
          </Field>
        </div>
      </FieldGroup>

      <Button
        type="button"
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          stepper.metadata.set('id', phone);
          void stepper.navigation.next();
        }}
        size="lg"
        className="mt-8 w-full"
      >
        Далее
      </Button>
    </form>
  );
}
