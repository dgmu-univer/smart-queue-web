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
import { DatePicker } from '@/components/ui/date-picker';
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { payloadDate } from '@/lib/date';

import { type MainSettings } from '../api/types';

// Регулярные выражения для базовой валидации формата
const timeRegex = /^\d{2}:\d{2}$/;

export const formSchema = z.object({
  work_date: z.object({
    start_date: z.date({ required_error: 'Поле обязательно для заполнения' }),
    end_date: z.date({ required_error: 'Поле обязательно для заполнения' }),
  }),
  work_time: z.object({
    start_time: z.string().regex(timeRegex, 'Неверный формат времени (ожидается HH:MM)'),
    end_time: z.string().regex(timeRegex, 'Неверный формат времени (ожидается HH:MM)'),
  }),
  lunch: z.object({
    start_time: z.string().optional(),
    end_time: z.string().optional(),
  }),
});

export default function MainSettings({ values }: { values?: MainSettings }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: values
      ? {
          ...values,
          work_date: {
            end_date: new Date(values.work_date.end_date),
            start_date: new Date(values.work_date.start_date),
          },
        }
      : undefined,
  });

  const onUpdate: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        work_date: {
          ...data.work_date,
          start_date: payloadDate(data.work_date.start_date),
          end_date: payloadDate(data.work_date.end_date),
        },
      };
      console.log(payload);
      await api('/admin-settings/periods', {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Основные настройки</CardTitle>
      </CardHeader>
      <form className="flex size-full flex-col gap-6" onSubmit={form.handleSubmit(onUpdate)}>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FieldSet>
              <FieldLegend>Приемная коммисия</FieldLegend>
              <FieldGroup className="flex flex-col md:flex-row">
                <Controller
                  control={form.control}
                  name="work_date.start_date"
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

                <Controller
                  control={form.control}
                  name="work_date.end_date"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="end">Конец</FieldLabel>
                      <DatePicker
                        {...field}
                        calendarProps={{
                          id: 'end',
                        }}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <FieldLegend>Рабочее время</FieldLegend>
              <FieldGroup className="flex flex-col md:flex-row">
                <Controller
                  control={form.control}
                  name="work_time.start_time"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="working_time.start_time">Начало</FieldLabel>
                      <Input {...field} id="working_time.start_time" type="time" placeholder="15" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="work_time.end_time"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="working_time.start_time">Начало</FieldLabel>
                      <Input {...field} id="working_time.start_time" type="time" placeholder="15" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <FieldLegend>Обед</FieldLegend>
              <FieldGroup className="flex flex-col md:flex-row">
                <Controller
                  control={form.control}
                  name="lunch.start_time"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="lunch.end_time">Начало</FieldLabel>
                      <Input {...field} id="lunch.start_time" type="time" placeholder="15" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="lunch.end_time"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="lunch.end_time">Конец</FieldLabel>
                      <Input {...field} id="lunch.end_time" type="time" placeholder="15" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={!form.formState.isDirty} loading={loading} type="submit">Сохранить</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
