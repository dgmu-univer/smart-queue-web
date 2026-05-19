'use client';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { PhoneInputField } from '../phone-input';
import { useStepper } from '../../steps';

const educationOptions = [
  { value: 'college', label: 'Колледж' },
  { value: 'specialty', label: 'Специалитет' },
  { value: 'residency', label: 'Ординатура' },
];

function generateTimeSlots() {
  const slots: string[] = [];
  for (let hour = 10; hour <= 17; hour++) {
    for (const minute of [0, 15, 30, 45]) {
      slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
    }
  }
  return slots;
}

const timeSlots = generateTimeSlots();

export default function DetailsStep() {
  const [education, setEducation] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string | undefined>('');
  const [slot, setSlot] = React.useState<string>('');
  const stepper = useStepper();
  const isStep1Valid = education.length && phone?.length && slot.length;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        stepper.navigation.next()
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="education">Уровень образования</FieldLabel>
          <Select value={education} onValueChange={setEducation}>
            <SelectTrigger id="education" className="w-full">
              <SelectValue placeholder="Выберите уровень" />
            </SelectTrigger>
            <SelectContent>
              {educationOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
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
            <DatePicker />
          </Field>

          <Field>
            <FieldLabel htmlFor="slot">Время</FieldLabel>
            <Select value={slot} onValueChange={setSlot}>
              <SelectTrigger id="slot" className="w-full">
                <SelectValue placeholder="Выберите слот" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {timeSlots.map(time => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </FieldGroup>

      <Button type="submit" size="lg" className="mt-8 w-full">
        Далее
      </Button>
    </form>
  );
}
