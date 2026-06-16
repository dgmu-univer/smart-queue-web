'use client';

import { useTransition } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { WithLevelId } from '../../../api.types';
import { FetchMainSettingsResponse } from '../api/types';
import { updateMainSettingsActions } from '../api/update-main-setting';
import { DegreeMainSettingFormProps, degreeMainSettingSchema } from '../lib/schema';
import { transformInitData } from '../lib/transform-init-data';
import { transformPayload } from '../lib/transform-payload';

type ComponentProps = WithLevelId<{ initialData?: FetchMainSettingsResponse }>;

export default function Main({ initialData, levelId }: ComponentProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<DegreeMainSettingFormProps>({
    resolver: zodResolver(degreeMainSettingSchema),
    values: transformInitData(initialData),
  });

  const skipLunch = useWatch<DegreeMainSettingFormProps, 'lunchOff'>({
    control: form.control,
    name: 'lunchOff',
  });

  const handleUpdate: SubmitHandler<DegreeMainSettingFormProps> = (data) => {
    startTransition(async () => {
      const payload = transformPayload(data);
      const result = await updateMainSettingsActions(levelId, payload);
      if (result.success) {
        toast.success('Основные настройки успешно обновлены!');
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
        <CardTitle className="text-foreground text-base font-semibold">Основные настройки</CardTitle>
        <CardDescription>
          Основные настройки используются для задания периода работы приёмной комиссии и базового расписания.
          Укажите даты начала и окончания действия настроек, затем задайте рабочее время, в рамках которого будет доступна запись.
          При необходимости можно настроить обеденный перерыв или отметить пункт «Не указывать обед», чтобы запись была доступна в течение всего рабочего дня.
          После внесения изменений нажмите кнопку «Сохранить» для применения настроек.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <form className="flex size-full flex-col gap-6" onSubmit={e => void form.handleSubmit(handleUpdate)(e)}>
          {/* Admission committee */}
          <div className="flex flex-col gap-3">
            <p className="text-foreground text-sm font-medium">Приёмная комиссия</p>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5">
                <Controller
                  control={form.control}
                  name="work_date.start_date"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-48">
                      <FieldLabel className="text-muted-foreground text-xs" htmlFor="work_date.start_date">Начало</FieldLabel>
                      <DatePicker
                        {...field}
                        className="h-9 w-48 text-sm"
                        calendarProps={{
                          id: 'work_date.start_date',
                        }}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Controller
                  control={form.control}
                  name="work_date.end_date"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-48">
                      <FieldLabel htmlFor="work_date.end_date" className="text-muted-foreground text-xs">Конец</FieldLabel>
                      <DatePicker
                        {...field}
                        calendarProps={{
                          id: 'work_date.end_date',
                        }}
                        className="h-9 w-44 text-sm"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Working hours */}
          <div className="flex flex-col gap-3">
            <p className="text-foreground text-sm font-medium">Рабочее время</p>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5">
                <Controller
                  control={form.control}
                  name="work_time.start_time"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-48">
                      <FieldLabel htmlFor="working_time.start_time" className="text-muted-foreground text-xs">Начало</FieldLabel>
                      <Input {...field} id="working_time.start_time" type="time" className="h-9 w-36 text-sm" placeholder="15" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Controller
                  control={form.control}
                  name="work_time.end_time"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-48">
                      <FieldLabel htmlFor="working_time.end_time" className="text-muted-foreground text-xs">Конец</FieldLabel>
                      <Input {...field} id="working_time.end_time" type="time" className="h-9 w-36 text-sm" placeholder="15" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Lunch */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <p className="text-foreground text-sm font-medium">Обед</p>
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
                    <FieldLabel
                      className="text-muted-foreground flex cursor-pointer items-center gap-2 text-sm select-none"
                      htmlFor="toggle-checkbox"
                    >
                      Не указывать обед
                    </FieldLabel>
                  </Field>

                )}
              />
            </div>
            {!skipLunch && (
              <div className="flex gap-4">
                <div className="flex flex-col gap-1.5">
                  <Controller
                    control={form.control}
                    name="lunch.start_time"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-48">
                        <FieldLabel htmlFor="lunch.start_time" className="text-muted-foreground text-xs">Начало</FieldLabel>
                        <Input {...field} id="lunch.start_time" type="time" placeholder="15" className="h-9 w-36 text-sm" />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Controller
                    control={form.control}
                    name="lunch.end_time"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-48">
                        <FieldLabel htmlFor="lunch.end_time" className="text-muted-foreground text-xs">Конец</FieldLabel>
                        <Input {...field} id="lunch.end_time" type="time" placeholder="15" className="h-9 w-36 text-sm" />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-2">
            <Button disabled={!form.formState.isDirty} loading={isPending} type="submit" size="sm">Сохранить</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
