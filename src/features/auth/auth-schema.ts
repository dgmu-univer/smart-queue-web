import { z } from 'zod';

export const authAdminCredsSchema = z.object({
  username: z.string(),
  password: z.string().min(1, 'Password is required'),
});

export const pinSchema = z.object({
  pin: z
    .string()
    .length(8, { message: 'PIN-код должен состоять ровно из 8 цифр' })
    .regex(/^\d+$/, { message: 'PIN-код должен содержать только цифры' }),
});

export type AdminFormData = z.infer<typeof authAdminCredsSchema>;
export type OperatorFormData = z.infer<typeof authAdminCredsSchema>;
