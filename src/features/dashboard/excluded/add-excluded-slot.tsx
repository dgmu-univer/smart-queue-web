'use client';

import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import * as z from 'zod';

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

import { updateExcludedActions } from './actions';
import { Plus } from 'lucide-react';

const formSchema = z.object({
  date: z.date({ required_error: 'Выберите дату' }),
  startTime: z.string().min(1, 'Укажите время начала'),
  endTime: z.string().min(1, 'Укажите время окончания'),
});

export type AddExcludedSlotFormProps = z.infer<typeof formSchema>;

export function AddExcludedSlot() {
  const [isOpen, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: '',
      endTime: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await updateExcludedActions(data);
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
  }

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
