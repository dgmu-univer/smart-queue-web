'use client';

import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '@/components/ui/button';
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

import { createDegreeProgram } from './actions';

export const formSchema = z.object({
  name: z.string({ required_error: 'Поле обязательно для заполнения' }).min(2, 'Имя должно содержать минимум 2 символа'),
  description: z.string().max(500, 'Описание не должно превышать 500 символов').optional(),
  pin: z.string({ required_error: 'Поле обязательно для заполнения' })
    .min(6, 'ПИН-код должен содержать минимум 6 цифр')
    .max(6, 'ПИН-код должен содержать максимум 6 цифр'),
});

export type AddEducationLevelFormProps = z.infer<typeof formSchema>;

export default function AddEducationLevel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      pin: '',
    },
  });

  function onCreate(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await createDegreeProgram(values);
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
        <Button className="gap-2" variant="secondary">
          <Plus className="size-4" />
          {' '}
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

        <form onSubmit={form.handleSubmit(onCreate)} className="flex flex-col gap-6">
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
