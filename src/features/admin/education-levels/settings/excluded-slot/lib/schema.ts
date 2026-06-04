import z from 'zod';

export const createExcludedSlotSchema = z.object({
  date: z.date({ required_error: 'Выберите дату' }),
  startTime: z.string().min(1, 'Укажите время начала'),
  endTime: z.string().min(1, 'Укажите время окончания'),
});

export type CreateExcludedSlotFormProps = z.infer<typeof createExcludedSlotSchema>;
