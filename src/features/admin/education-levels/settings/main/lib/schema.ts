import z from 'zod';

export const degreeMainSettingSchema = z.object({
  work_date: z.object({
    start_date: z.date({ required_error: 'Поле обязательно для заполнения' }),
    end_date: z.date({ required_error: 'Поле обязательно для заполнения' }),
  }),
  work_time: z.object({
    start_time: z.string({ required_error: 'Поле обязательно для заполнения' }),
    end_time: z.string({ required_error: 'Поле обязательно для заполнения' }),
  }),
  lunchOff: z.boolean(),
  lunch: z.object({
    start_time: z.string().optional(),
    end_time: z.string().optional(),
  }).nullable(),
});

export type DegreeMainSettingFormProps = z.infer<typeof degreeMainSettingSchema>;
