'use client';

import { useState } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
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
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { updateMainSettingsActions } from './actions';
import { MainSettings } from './types';
import { defineInitData } from './utils';

// Регулярные выражения для базовой валидации формата
const timeRegex = /^\d{2}:\d{2}:\d{2}$/;

export const formSchema = z.object({
  work_date: z.object({
    start_date: z.date({ required_error: 'Поле обязательно для заполнения' }),
    end_date: z.date({ required_error: 'Поле обязательно для заполнения' }),
  }),
  work_time: z.object({
    start_time: z.string().regex(timeRegex, 'Неверный формат времени (ожидается HH:MM)'),
    end_time: z.string().regex(timeRegex, 'Неверный формат времени (ожидается HH:MM)'),
  }),
  lunchOff: z.boolean(),
  lunch: z.object({
    start_time: z.string().optional(),
    end_time: z.string().optional(),
  }),
});

export type MainSettingsFormProps = z.infer<typeof formSchema>;

export default function MainSettingsForm({ initialData }: { initialData?: MainSettings }) {
  const [pending, setPenging] = useState(false);
  const form = useForm<MainSettingsFormProps>({
    resolver: zodResolver(formSchema),
    values: defineInitData(initialData),
  });

  const lunchOff = useWatch<MainSettingsFormProps, 'lunchOff'>({
    control: form.control,
    name: 'lunchOff',
  });

  const onUpdate: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    try {
      setPenging(true);
      await updateMainSettingsActions(data);
    } catch (e) {
      console.log(e);
    } finally {
      setPenging(false);
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
              <FieldLegend className="flex flex-row items-center gap-6">
                Обед
                <Controller
                  control={form.control}
                  name="lunchOff"
                  render={({ field }) => (
                    <Field orientation="horizontal">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="toggle-checkbox"
                        name="toggle-checkbox"
                      />
                      <FieldLabel htmlFor="toggle-checkbox">Не указывать обед</FieldLabel>
                    </Field>

                  )}
                />
              </FieldLegend>
              <FieldGroup className="flex flex-col md:flex-row">
                <Controller
                  control={form.control}
                  name="lunch.start_time"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} data-disabled={lunchOff}>
                      <FieldLabel htmlFor="lunch.end_time">Начало</FieldLabel>
                      <Input {...field} disabled={lunchOff} id="lunch.start_time" type="time" placeholder="15" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="lunch.end_time"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} data-disabled={lunchOff}>
                      <FieldLabel htmlFor="lunch.end_time">Конец</FieldLabel>
                      <Input {...field} disabled={lunchOff} id="lunch.end_time" type="time" placeholder="15" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={!form.formState.isDirty} loading={pending} type="submit">Сохранить</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
