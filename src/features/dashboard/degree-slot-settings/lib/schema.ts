import z from 'zod';

export const slotSettingSchema = z.object({
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

export type SlotSettingFormProps = z.infer<typeof slotSettingSchema>;
