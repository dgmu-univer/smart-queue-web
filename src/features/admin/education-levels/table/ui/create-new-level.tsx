'use client';

import { useEffect, useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Textarea } from '@/components/ui/textarea';

import { createEducationLevel } from '../api/create-edu-level';
import { createPayload } from '../lib/create-payload';

export const formSchema = z.object({
  name: z.string({ required_error: 'Поле обязательно для заполнения' }).min(2, 'Имя должно содержать минимум 2 символа'),
  description: z.string().max(500, 'Описание не должно превышать 500 символов').optional(),
  startDate: z.date({ required_error: 'Поле обязательно для заполнения' }),
  endDate: z.date({ required_error: 'Поле обязательно для заполнения' }),
  pin: z.string({ required_error: 'Поле обязательно для заполнения' })
    .min(6, 'ПИН-код должен содержать минимум 6 цифр')
    .max(6, 'ПИН-код должен содержать максимум 6 цифр'),
});

export type CreateNewLevelFormProps = z.infer<typeof formSchema>;

export default function CreateNewEducationLevel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      pin: '',
      startDate: undefined,
      endDate: undefined,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
    return () => {
      form.reset();
    };
  }, [form, isOpen]);

  function handleCreate(values: z.infer<typeof formSchema>) {
    const payload = createPayload(values);
    startTransition(async () => {
      const result = await createEducationLevel(payload);
      if (result.success) {
        form.reset();
        setIsOpen(false);
        router.refresh();
        toast.success('Уровень образования успешно создан!');
      } else {
        toast.error(`Что-то пошло не так! (${result.error.status.toString()})`, {
          description: result.error.message,
          descriptionClassName: 'text-foreground',
        });
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="size-4" />
          Добавить уровень образования
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Добавить уровень образования</DialogTitle>
          <DialogDescription>
            Добавьте уровень образования (например, «Колледж», «Бакалавриат», «Ординатура»).
            Укажите название, описание и уникальный пин-код из 6 цифр — он будет использоваться оператором для авторизации.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={e => void form.handleSubmit(handleCreate)(e)} className="flex flex-col gap-6">
          <div className="grid gap-4">
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Наименование</FieldLabel>
                  <Input {...field} id="name" placeholder="Введите наименование" />
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
              name="startDate"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="startDate">Дата начала</FieldLabel>
                  <DatePicker {...field} placeholder="Выберите дату" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="endDate"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="endDate">Дата окончания</FieldLabel>
                  <DatePicker {...field} placeholder="Выберите дату" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="pin"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="pin">Пин-код (6 знаков)</FieldLabel>
                  <FieldDescription>
                    Пин-код будет использоваться оператором для входа.
                  </FieldDescription>
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
