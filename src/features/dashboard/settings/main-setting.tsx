'use client';

import { use } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid } from '@radix-ui/themes';
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
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import * as types from '../api/types';

// Регулярные выражения для базовой валидации формата
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^\d{2}:\d{2}$/;

export const formSchema = z.object({
  period: z.object({
    start_date: z.string().regex(dateRegex, 'Неверный формат даты (ожидается YYYY-MM-DD)'),
    end_date: z.string().regex(dateRegex, 'Неверный формат даты (ожидается YYYY-MM-DD)'),
  }),
  working_time: z.object({
    start_time: z.string().regex(timeRegex, 'Неверный формат времени (ожидается HH:MM)'),
    end_time: z.string().regex(timeRegex, 'Неверный формат времени (ожидается HH:MM)'),
  }),
  lanch: z.object({
    start_time: z.string().regex(timeRegex, 'Неверный формат времени (ожидается HH:MM)').nullable(),
    end_time: z.string().regex(timeRegex, 'Неверный формат времени (ожидается HH:MM)').nullable(),
  }),
});

export default function MainSettings({ values }: { values: types.GetPeriodSettings }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values,
  });

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Основные настройки</CardTitle>
      </CardHeader>
      <CardContent>
        <Grid columns="2" gap="6" width="auto">
          <FieldSet>
            <FieldLegend>Приемная коммисия</FieldLegend>
            <FieldGroup className="flex flex-col md:flex-row">
              <Field>
                <FieldLabel htmlFor="start">{JSON.stringify(values)}</FieldLabel>
                <DatePicker />
              </Field>
              <Field>
                <FieldLabel htmlFor="end">Конец</FieldLabel>
                <DatePicker />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Рабочее время</FieldLegend>
            <FieldGroup className="flex flex-col md:flex-row">
              <Field>
                <FieldLabel htmlFor="slot">Начало</FieldLabel>
                <Input id="slot" type="time" placeholder="15" />
              </Field>
              <Field>
                <FieldLabel htmlFor="count">Конец</FieldLabel>
                <Input id="count" type="time" placeholder="10" />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Обед</FieldLegend>
            <FieldGroup className="flex flex-col md:flex-row">
              <Field>
                <FieldLabel htmlFor="slot">Начало</FieldLabel>
                <Input id="slot" type="time" placeholder="15" />
              </Field>
              <Field>
                <FieldLabel htmlFor="count">Конец</FieldLabel>
                <Input id="count" type="time" placeholder="10" />
              </Field>
            </FieldGroup>
          </FieldSet>
        </Grid>
      </CardContent>
      <CardFooter>
        <Button>Сохранить</Button>
      </CardFooter>
    </Card>
  );
}
