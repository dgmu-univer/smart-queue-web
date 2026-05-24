'use-client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const schema = z.object({
  pin: z.string({ required_error: 'Пин-код обязателен' }).min(6).max(6),
});

export const OparatorForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const { handleSubmit, control } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      pin: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true);
    setServerError(null);

    try {
      // Use NextAuth signIn with credentials provider
      const result = await signIn('credentials', {
        pin: data.pin,
        redirect: false, // Don't redirect automatically
      });

      if (result?.error) {
        setServerError(result.error);
        return;
      }
      // Success - redirect based on user role
      // NextAuth session will be available after successful sign in
      if (result?.url) {
        router.push(result.url);
      } else {
        router.push('/booking');
        router.refresh(); // Refresh to update session on server
      }
    } catch (error) {
      console.error('Login error:', error);
      setServerError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => {
      void handleSubmit(onSubmit)(e);
    }}
    >
      {error && <div className="text-red-500">{error}</div>}
      <FieldGroup>
        <Controller
          name="pin"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="pin">Пин-код</FieldLabel>
              <InputOTP maxLength={6} id="otp-verification" {...field} required>
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" loading={loading} className="mt-6 w-full bg-blue-600" size="lg">
        Войти
      </Button>
    </form>
  );
};
