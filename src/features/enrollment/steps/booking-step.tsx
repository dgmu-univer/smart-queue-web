'use client';

import { useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dateAsApiString } from '@/lib/date';

import { enrollmentApi } from '../api/enrollment-api';
import { GetDegreeProgramsResponse } from '../api/types';
import { PhoneInputField } from '../components/phone-input';
import { type BookingFormValues, bookingSchema } from './schema';

interface EnrollmentBookingProps {
  initialData: GetDegreeProgramsResponse
  onNext: BookingStepNextHandler
}

export interface BookingStepNextHandlerProps { bookingId: number }
export type BookingStepNextHandler = ({ bookingId }: BookingStepNextHandlerProps) => void;

export default function BookingStep({ initialData, onNext }: EnrollmentBookingProps) {
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots]
    = useState(false);

  const [slotsLoaded, setSlotsLoaded]
    = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),

    defaultValues: {
      degreeId: '',
      phone: '',
      slot: '',
      date: undefined,
    },
  });

  const degreeId = useWatch({
    control,
    name: 'degreeId',
  });

  const selectedDate = useWatch({
    control,
    name: 'date',
  });

  const startDate = useMemo(
    () =>
      new Date(initialData.periodSettings.start_date),
    [initialData.periodSettings.start_date],
  );

  const endDate = useMemo(
    () =>
      new Date(initialData.periodSettings.end_date),
    [initialData.periodSettings.end_date],
  );

  const disabledMatcher = (date: Date) => {
    return date < startDate || date > endDate;
  };

  useEffect(() => {
    async function fetchSlots() {
      if (!degreeId || !selectedDate) {
        setSlots([]);
        setSlotsLoaded(false);

        return;
      }

      try {
        setLoadingSlots(true);
        setValue('slot', '');

        const freeSlots = await enrollmentApi.getFreeSlot({
          date: dateAsApiString(selectedDate),
          degreeId,
        });

        setSlots(freeSlots.slots);
        setSlotsLoaded(true);
      } catch (error) {
        console.error(error);
        setSlots([]);
        setSlotsLoaded(true);
      } finally {
        setLoadingSlots(false);
      }
    }

    void fetchSlots();
  }, [degreeId, selectedDate, setValue]);

  const handleBooking: SubmitHandler<BookingFormValues> = () => {
    onNext({
      bookingId: 1,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(handleBooking)(e);
      }}
      className="space-y-6"
    >
      {/* Уровень образования */}
      <Controller
        control={control}
        name="degreeId"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="degreeId">Уровень образования</FieldLabel>
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите уровень" />
              </SelectTrigger>

              <SelectContent>
                {initialData.degreePrograms.map(
                  program => (
                    <SelectItem
                      key={program.id}
                      value={String(program.id)}
                    >
                      {program.name}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>

        )}
      />

      {/* Телефон */}
      <Controller
        control={control}
        name="phone"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="phone">Телефон</FieldLabel>
            <PhoneInputField
              id="phone"
              international={false}
              defaultCountry="RU"
              value={field.value}
              onChange={field.onChange}
              className="flex items-center gap-2"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      { /* Дата и время */ }
      <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Дата */}
        <Controller
          control={control}
          name="date"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="date">Дата</FieldLabel>
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                calendarProps={{
                  disabled:
                      disabledMatcher,
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Время */}
        <Controller
          control={control}
          name="slot"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="slot">Время</FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={
                  !degreeId
                  || !selectedDate
                  || loadingSlots
                  || slots.length === 0
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      loadingSlots
                        ? 'Загрузка...'
                        : 'Выберите слот'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {loadingSlots
                    ? (
                        <div className="text-muted-foreground flex items-center gap-2 px-3 py-2 text-sm">
                          <Loader2 className="size-4 animate-spin" />
                          Загрузка
                        </div>
                      )
                    : (
                        slots.map(time => (
                          <SelectItem
                            key={time}
                            value={time}
                          >
                            {time}
                          </SelectItem>
                        ))
                      )}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Нет слотов */}
      {slotsLoaded
        && !loadingSlots
        && selectedDate
        && degreeId
        && slots.length === 0 && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          На выбранную дату нет свободных слотов.
          Выберите другую дату.
        </div>
      )}

      {/* Кнопка */}
      <Button
        type="submit"
        className="w-full"
        disabled={loadingSlots}
      >
        Далее
      </Button>
    </form>
  );
}
