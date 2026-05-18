'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Textarea } from '@/components/ui/textarea';

import { updateEducationLevel } from './actions';

export const formSchema = z.object({
  // Обязательная строка, минимум 2 символа
  name: z.string({ required_error: 'Поле обязательно для заполнения' }).min(2, 'Имя должно содержать минимум 2 символа'),

  // Необязательная строка, максимум 500 символов
  description: z.string().max(500, 'Описание не должно превышать 500 символов').optional(),

  // ПИН-код строго из 6 цифр (передается как строка)
  pin: z.string({ required_error: 'Поле обязательно для заполнения' }),
});

export type AddEducationLevelFormProps = z.infer<typeof formSchema>;

export default function AddEducationLevel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      pin: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsPending(true);
      await updateEducationLevel(values);
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          {' '}
          Добавить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Добавить уровень образования</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-4 py-4">
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Начало</FieldLabel>
                  <Input {...field} id="name" placeholder="Наименование" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Описание</FieldLabel>
                  <Textarea {...field} id="description" placeholder="Введите описание" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="pin"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="pin">Пин код (6 знаков)</FieldLabel>
                  <InputOTP
                    maxLength={8}
                    {...field}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit" loading={isPending}>
              Сохранить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
