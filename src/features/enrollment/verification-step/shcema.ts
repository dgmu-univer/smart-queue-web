import z from 'zod';

export const otpSchema = z.object({
  pin: z.string().length(6, {
    message: 'Код должен состоять ровно из 6 цифр.',
  }),
});

export type OtpFormValues = z.infer<typeof otpSchema>;
