'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { updateExcludedActions } from './actions';

const formSchema = z.object({
  date: z.date({ required_error: 'Выберите дату' }),
  startTime: z.string().min(1, 'Укажите время начала'),
  endTime: z.string().min(1, 'Укажите время окончания'),
});

export type AddExcludedSlotFormProps = z.infer<typeof formSchema>;

export function AddExcludedSlot({ _onSubmit }: { _onSubmit: () => void }) {
  const [isOpen, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: '00:00',
      endTime: '00:00',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsPending(true);
      await updateExcludedActions(values);
      setOpen(false);
      _onSubmit();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => { setOpen(true); }}>Добавить</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Добавить исключенный слот</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex size-full flex-col gap-6">
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
