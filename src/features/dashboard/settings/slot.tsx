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

export default function SlotSettings() {
  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Настройки слота</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter>
        <Button>Сохранить</Button>
      </CardFooter>
    </Card>
  );
}
