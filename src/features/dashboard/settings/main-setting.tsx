'use client';
import { Grid } from '@radix-ui/themes';

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

export default function MainSettings() {
  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Основыне настройки</CardTitle>
      </CardHeader>
      <CardContent>
        <Grid columns="2" gap="6" width="auto">
          <FieldSet>
            <FieldLegend>Приемная коммисия</FieldLegend>
            <FieldGroup className="flex flex-col md:flex-row">
              <Field>
                <FieldLabel htmlFor="start">Начало</FieldLabel>
                <DatePicker />
              </Field>
              <Field>
                <FieldLabel htmlFor="end">Конец</FieldLabel>
                <DatePicker />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Приемная коммисия</FieldLegend>
            <FieldGroup className="flex flex-col md:flex-row">
              <Field>
                <FieldLabel htmlFor="slot">Время слота</FieldLabel>
                <Input id="slot" type="number" placeholder="15" />
              </Field>
              <Field>
                <FieldLabel htmlFor="count">Количество записей</FieldLabel>
                <Input id="count" type="number" placeholder="10" />
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
