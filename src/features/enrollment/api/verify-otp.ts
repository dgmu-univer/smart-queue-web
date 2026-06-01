import { api } from '@/lib/api';
import { VerifyOtpPayload, VerifyOtpResponse } from './types';

export async function verifyOtp(payload: VerifyOtpPayload): Promise<VerifyOtpResponse> {
  return await api<VerifyOtpResponse>(
    `/public/appointments/verification`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}
