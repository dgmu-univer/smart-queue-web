'use client';

import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowLeft } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { extractApiError } from '@/lib/extract-api-error';

import { VerifyOtpResponse } from '../../api/types';
import { verifyOtp } from '../../api/verify-otp';
import { type BookingStepMeta } from '../booking-step/booking-step';
import { AlertError } from '../booking-step/reducer';
import { type OtpFormValues, otpSchema } from './shcema';
import GetPinButton from './get-pin-code';

interface VerificationStepProps {
  onBack: () => void
  onNext: VerificationStepNextHandler
  meta: BookingStepMeta
}

export type VerificationStepNextHandler = (confirmData: VerifyOtpResponse) => void;

export default function VerificationStep({ onBack, onNext, meta }: VerificationStepProps) {
  const [isPending, setIsPending] = useState(false);
  const [verificationError, setVerificationError] = useState<AlertError | null>(null);
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { pin: '' },
  });

  const handleVerify: SubmitHandler<OtpFormValues> = async (data) => {
    try {
      setIsPending(true);
      const result = await verifyOtp({
        id: meta.record.id,
        verificationCode: data.pin,
      });
      onNext(result);
    } catch (error) {
      const { message, status } = extractApiError(error);

      const err: AlertError = status === 400
        ? { variant: 'destructive', title: 'Неверный код', description: 'Введён неверный 4-значный код из SMS. Проверьте код и попробуйте снова.' }
        : { variant: 'destructive', title: 'Ошибка', description: message };

      setVerificationError(err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-2">
      <div className="space-y-2 text-center md:text-left">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
          Подтверждение номера телефона
        </h2>
        {meta.record.status === 'NEW' && (
          <p className="text-sm/relaxed text-neutral-500">
            Мы отправили SMS с 4-значным кодом на номер
            {' '}
            <span className="font-medium text-neutral-950">{meta.phone}</span>
            . Код действителен в течение 30 минут.
          </p>
        )}
        {meta.record.status === 'PENDING' && (
          <p className="text-sm/relaxed text-neutral-500">
            ⚠️ Вы ранее запрашивали код по номеру телефона и уровню образования. Используйте этот код для подтверждения новой записи.
          </p>
        )}
        {meta.record.status === 'CONFIRMED' && (
          <p className="text-sm/relaxed text-neutral-500">
            ✅ Операция выполнена — данные обновлены и сохранены.
            ⚠️ Пин-код от вашей карточки не изменился, он остался таким же, как и ранее. Пожалуйста, укажите его для оформления и получения карточки с актуальными данными.
          </p>
        )}
      </div>
      <form onSubmit={(e) => { void form.handleSubmit(handleVerify)(e); }} className="space-y-6">
        <Controller
          control={form.control}
          name="pin"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col items-center justify-center space-y-4">
              <FieldLabel>Введите код из SMS</FieldLabel>
              <InputOTP
                aria-invalid={fieldState.invalid}
                maxLength={4}
                {...field}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="h-12 w-10 rounded-md border text-lg sm:w-12" />
                  <InputOTPSlot index={1} className="h-12 w-10 rounded-md border text-lg sm:w-12" />
                  <InputOTPSlot index={2} className="h-12 w-10 rounded-md border text-lg sm:w-12" />
                  <InputOTPSlot index={3} className="h-12 w-10 rounded-md border text-lg sm:w-12" />
                </InputOTPGroup>
              </InputOTP>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {verificationError && (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>{verificationError.title}</AlertTitle>
            <AlertDescription>
              {verificationError.description}
            </AlertDescription>
          </Alert>
        )}

        <GetPinButton recordId={meta.record.id} />

        <div className="flex items-center gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isPending}
            className="h-11 flex-1"
          >
            <ArrowLeft className="mr-2 size-4" />
            {' '}
            Назад
          </Button>

          <Button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            className="h-11 flex-1 bg-blue-600 text-white transition-colors hover:bg-blue-700"
          >
            Подтвердить
          </Button>
        </div>
      </form>
    </div>
  );
}
