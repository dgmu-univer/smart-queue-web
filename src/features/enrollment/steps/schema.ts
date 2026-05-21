import { z } from 'zod';
import {
  isValidPhoneNumber,
} from 'react-phone-number-input';

export const bookingSchema = z.object({
  degreeId: z.string().min(1, 'Выберите уровень образования'),

  phone: z
    .string()
    .min(1, 'Введите номер телефона')
    .refine(
      value => isValidPhoneNumber(value),
      'Некорректный номер',
    ),

  date: z.date({
    required_error: 'Выберите дату',
  }).optional(),

  slot: z.string().min(1, 'Выберите время'),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
