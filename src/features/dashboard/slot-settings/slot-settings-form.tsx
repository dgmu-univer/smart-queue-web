'use client';

import { useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import FieldHint from './components/field-hint';
import { updateSlotSettingsActions } from './actions';

const formSchema = z.object({
  duration_minutes: z.coerce
    .number({ required_error: 'Время слота обязательно' })
    .min(5, { message: 'Минимум 5 минут' })
    .max(60, { message: 'Максимум 60 минут' }),

  capacity_per_slot: z.coerce
    .number({ required_error: 'Вместимость слота обязательно' })
    .min(1, { message: 'Минимум 1 человек' })
    .max(15, { message: 'Максимум 15 человек' }),
});
export interface SlotSettings {
  duration_minutes: number
  capacity_per_slot: number
}

export type SlotSettingsFormProps = z.infer<typeof formSchema>;

export default function SlotSettingsForm({ initialData }: { initialData: SlotSettings }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SlotSettingsFormProps>({
    resolver: zodResolver(formSchema),
    values: initialData,
  });

  const handleUpdate: SubmitHandler<SlotSettingsFormProps> = (data) => {
    startTransition(async () => {
      const result = await updateSlotSettingsActions(data);
      if (result.success) {
        toast.success('Настройки слота успешно обновлены!');
      } else {
        toast.error(`Что-то пошло не так! (${result.error.status.toString()})`, {
          description: result.error.message,
          descriptionClassName: 'text-foreground',
        });
      }
    });
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Настройки слота</CardTitle>
      </CardHeader>
      <form
        onSubmit={(e) => {
          void form.handleSubmit(handleUpdate)(e);
        }}
        className="flex size-full flex-col gap-6"
      >
        <CardContent>
          <FieldGroup className="flex flex-col md:flex-row">
            <Controller
              control={form.control}
              name="duration_minutes"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="duration_minutes">Время слота</FieldLabel>
                  <FieldHint hint="минут">
                    <Input {...field} id="duration_minutes" type="number" placeholder="15" />
                  </FieldHint>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="capacity_per_slot"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="capacity_per_slot">Вместимость слота</FieldLabel>
                  <FieldHint hint="человек">
                    <Input {...field} id="capacity_per_slot" type="number" placeholder="10" />
                  </FieldHint>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button type="submit" loading={isPending} disabled={!form.formState.isDirty}>Сохранить</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
