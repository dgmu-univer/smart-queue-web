'use client';

import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { dateAsApiString } from '@/lib/date';

import { WithDegreeId } from '../../api.types';
import { createExcludedSlot } from '../api/create-excluded-slot';
import { CreateExcludedSlotPayload } from '../api/types';
import { type CreateExcludedSlotFormProps, createExcludedSlotSchema } from '../lib/schema';

export function CreateExcludedSlot({ degreeId }: WithDegreeId) {
  const [isOpen, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<CreateExcludedSlotFormProps>({
    resolver: zodResolver(createExcludedSlotSchema),
    defaultValues: {
      startTime: '',
      endTime: '',
    },
  });

  const handleCreate = (data: CreateExcludedSlotFormProps) => {
    startTransition(async () => {
      const payload: CreateExcludedSlotPayload = {
        date: dateAsApiString(data.date),
        start_time: data.startTime,
        end_time: data.endTime,
      };
      const result = await createExcludedSlot(degreeId, payload);
      if (result.success) {
        form.reset();
        setOpen(false);
        router.refresh();
        toast.success('Слот успешно добавлен!');
      } else {
        toast.error(`Что-то пошло не так! (${result.error.status.toString()})`, {
          description: result.error.message,
          descriptionClassName: 'text-foreground',
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => { setOpen(true); }} className="gap-2">
          <Plus className="size-4" />
          {' '}
          Добавить слот
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Добавить исключенный слот</DialogTitle>
          <DialogDescription>
            Добавьте период, который будет исключён из расписания записи.
            В указанное время абитуриенты не смогут выбрать этот слот для бронирования.
            Полезно для обеденных перерывов, собраний или личных событий.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            void form.handleSubmit(handleCreate)(e);
          }}
          className="flex size-full flex-col gap-6"
        >
          <Controller
            control={form.control}
            name="date"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="start">Начало</FieldLabel>
                <DatePicker
                  {...field}
                  calendarProps={{
                    id: 'start',
                  }}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <FieldGroup className="flex flex-col md:flex-row">
            <Controller
              control={form.control}
              name="startTime"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="working_time.start_time">Начало</FieldLabel>
                  <Input {...field} id="working_time.start_time" type="time" placeholder="16:00" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="endTime"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="working_time.start_time">Начало</FieldLabel>
                  <Input {...field} id="working_time.start_time" type="time" placeholder="15:00" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit" loading={isPending} className="w-full">Сохранить</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
