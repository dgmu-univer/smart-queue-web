import z from 'zod';

export const otpSchema = z.object({
  pin: z.string().length(4, {
    message: 'Код должен состоять ровно из 4 цифр.',
  }),
});

export type OtpFormValues = z.infer<typeof otpSchema>;
