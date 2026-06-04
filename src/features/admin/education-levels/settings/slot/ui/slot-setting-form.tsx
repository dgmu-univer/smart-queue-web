'use client';

import { useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { WithLevelId } from '../../../api.types';
import { FetchSlotSettingsResponse } from '../api/types';
import { updateSlotSettingsActions } from '../api/update-slot-setting';
import FieldHint from '../components/field-hint';
import type { SlotSettingFormProps } from '../lib/schema';
import { slotSettingSchema } from '../lib/schema';

type ComponentProps = WithLevelId<{
  initialData: FetchSlotSettingsResponse
}>;

export default function SlotSettingForm({ initialData, levelId }: ComponentProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SlotSettingFormProps>({
    resolver: zodResolver(slotSettingSchema),
    values: initialData,
  });

  const handleUpdate: SubmitHandler<SlotSettingFormProps> = (data) => {
    startTransition(async () => {
      const result = await updateSlotSettingsActions(levelId, data);
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
    <Card className="border-border border shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground text-base font-semibold">Настройка слота</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            void form.handleSubmit(handleUpdate)(e);
          }}
          className="flex size-full flex-col gap-6"
        >
          <div className="flex gap-4">
            <div className="flex flex-col gap-1.5">
              <Controller
                control={form.control}
                name="duration_minutes"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="duration_minutes" className="text-muted-foreground text-xs">Длительность слота (мин)</FieldLabel>
                    <Input {...field} id="duration_minutes" type="number" placeholder="15" className="h-9 w-36 text-sm" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Controller
                control={form.control}
                name="capacity_per_slot"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="capacity_per_slot" className="text-muted-foreground text-xs">Вместимость слота</FieldLabel>
                    <Input {...field} id="capacity_per_slot" type="number" placeholder="10" className="h-9 w-36 text-sm" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </div>
          <div className="pt-2">
            <Button type="submit" size="sm" loading={isPending} disabled={!form.formState.isDirty}>Сохранить</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
