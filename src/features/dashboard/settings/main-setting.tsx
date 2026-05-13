'use client';

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

import * as types from '../api/types';

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
  lanch: z.object({
    start_time: z.string().regex(timeRegex, 'Неверный формат времени (ожидается HH:MM)').optional(),
    end_time: z.string().regex(timeRegex, 'Неверный формат времени (ожидается HH:MM)').optional(),
  }),
});

export default function MainSettings({ values }: { values?: types.GetPeriodSettings }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: values
      ? {
          lanch: values.lanch,
          work_time: values.work_time,
          work_date: {
            end_date: new Date(values.work_date.end_date),
            start_date: new Date(values.work_date.start_date),
          },
        }
      : undefined,
  });

  const onUpdate: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    console.log(data);
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Основные настройки</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdate)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                  name="lanch.start_time"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="lanch.end_time">Конец</FieldLabel>
                      <Input {...field} id="lanch.end_time" type="time" placeholder="15" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="lanch.end_time"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="lanch.end_time">Конец</FieldLabel>
                      <Input {...field} id="lanch.end_time" type="time" placeholder="15" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button>Сохранить</Button>
      </CardFooter>
    </Card>
  );
}
