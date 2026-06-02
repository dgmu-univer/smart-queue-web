'use client';

import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { AlertCircleIcon } from 'lucide-react';
import { toast } from 'sonner';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dateAsApiString } from '@/lib/date';
import { extractApiError } from '@/lib/extract-api-error';

import { createEnrollment } from '../../api/create-enrollment';
import { existingEnrollment } from '../../api/existing-enrollment';
import { type DegreeListItem } from '../../api/types';
import { useDateDisabled } from './hooks/use-disabled-date';
import { useFreeSlots } from './hooks/use-free-slot';
import { ExistingWarning } from './existing-warning';
import { PhoneInputField } from './phone-input';
import { type BookingFormValues, bookingSchema } from './schema';

interface EnrollmentBookingProps {
  degreeList: DegreeListItem[]
  onNext: BookingStepNextHandler
}

export interface BookingStepMeta { bookingId: number, phone: string }
export type BookingStepNextHandler = ({ bookingId, phone }: BookingStepMeta) => void;

export default function BookingStep({ degreeList, onNext }: EnrollmentBookingProps) {
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isExistingWarningOpen, setIsExistingWarningOpen] = useState(false);
  const [degree, setDegree] = useState<DegreeListItem | null>(null);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      degreeId: '',
      phone: '',
      slot: '',
      date: undefined,
    },
  });
  const { slots, isSlotDisabled, isSlotLoading, slotError } = useFreeSlots(control, setValue);

  const degreeId = useWatch({ control, name: 'degreeId' });

  useEffect(() => {
    const selectedDegree = degreeList.find(d => d.id.toString() === degreeId);
    setTimeout(() => {
      setDegree(selectedDegree ?? null);
    }, 0);
  }, [degreeId, degreeList]);

  const disabledMatcher = useDateDisabled(degree?.periodSettings);

  // TODO доработать ошибки
  const handleCreateEnrollment: SubmitHandler<BookingFormValues> = async (data) => {
    try {
      setIsBookingLoading(true);

      const bookingId = await createEnrollment({
        degreeId: Number(data.degreeId),
        date: dateAsApiString(data.date),
        time: data.slot,
        phone: data.phone,
      });
      onNext({ bookingId, phone: data.phone });
    } catch (error) {
      const { message } = extractApiError(error);
      toast.error('Не удалось забронировать', {
        description: message,
      });
      console.error(error);
    } finally {
      setIsBookingLoading(false);
    }
  };

  const handleBooking: SubmitHandler<BookingFormValues> = async (data) => {
    try {
      setIsBookingLoading(true);
      const response = await existingEnrollment({
        degreeId: Number(data.degreeId),
        phone: data.phone,
      });
      if (response.isExisting) {
        setIsExistingWarningOpen(true);
      } else {
        await handleCreateEnrollment(data);
      }
    } catch (error) {
      const { message } = extractApiError(error);
      toast.error('Не удалось проверить номер', {
        description: message,
      });
      console.error(error);
    } finally {
      setIsBookingLoading(false);
    }
  };

  const handleExistingEnrollment = async () => {
    setIsExistingWarningOpen(false);
    await handleCreateEnrollment(getValues());
  };

  const error = slotError;
  const isSubmitDisabled = !!error;
  const isSubmitLoading = isSlotLoading || isBookingLoading;

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
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="degreeId">Уровень образования</FieldLabel>
            <Select

              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                <SelectValue placeholder="Выберите уровень" />
              </SelectTrigger>

              <SelectContent>
                {degreeList.map(
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
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="phone">Телефон</FieldLabel>
            <PhoneInputField
              aria-invalid={fieldState.invalid}
              id="phone"
              countrySelectProps={{ unicodeFlags: true }}
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
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="date">Дата</FieldLabel>
              <DatePicker
                aria-invalid={fieldState.invalid}
                value={field.value}
                onChange={field.onChange}
                calendarProps={{
                  id: 'date',
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
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="slot">Время</FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isSlotDisabled}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                  <SelectValue
                    placeholder={
                      isSlotLoading
                        ? 'Загрузка...'
                        : 'Выберите слот'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {isSlotLoading
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

      {
        error && (
          <Alert variant={error.variant} className="max-w-md">
            <AlertCircleIcon />
            <AlertTitle>{error.title}</AlertTitle>
            {error.description && <AlertDescription>{error.description}</AlertDescription>}
          </Alert>
        )
      }

      {/* Кнопка */}
      <Button
        type="submit"
        className="h-11 w-full flex-1 bg-neutral-950 text-white"
        disabled={isSubmitDisabled}
        loading={isSubmitLoading}
      >
        Далее
      </Button>
      <ExistingWarning
        isOpen={isExistingWarningOpen}
        onConfirm={() => {
          void handleExistingEnrollment();
        }}
        onCancel={() => { setIsExistingWarningOpen(false); }}
      />
    </form>
  );
}
