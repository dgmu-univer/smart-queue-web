'use client';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { api } from '@/lib/api';

import { type SlotSettings } from '../api/types';

const formSchema = z.object({
  duration_minutes: z.string({ required_error: 'Время слота обязательно' }),
  capacity_per_slot: z.string({ required_error: 'Вместимость слота обязательно' }),
});

export default function SlotSettings({ values }: { values: SlotSettings }) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      duration_minutes: values.duration_minutes.toString(),
      capacity_per_slot: values.capacity_per_slot.toString(),
    },
  });

  const onUpdate: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    try {
      setIsLoading(true);
      const payload = {
        ...data,
      };
      await api('/admin-settings/slots', {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Настройки слота</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onUpdate)} className="flex size-full flex-col gap-6">
        <CardContent>
          <FieldGroup className="flex flex-col md:flex-row">
            <Controller
              control={form.control}
              name="duration_minutes"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="duration_minutes">Время слота</FieldLabel>
                  <Input {...field} id="duration_minutes" type="number" placeholder="15" />
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
                  <Input {...field} id="capacity_per_slot" type="number" placeholder="10" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button type="submit" loading={isLoading} disabled={!form.formState.isDirty}>Сохранить</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
