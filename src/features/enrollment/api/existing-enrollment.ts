import { api } from '@/lib/api';
import { ExistingEnrollmentPayload } from './types';

export async function existingEnrollment(payload: ExistingEnrollmentPayload): Promise<{ isExisting: boolean }> {
  return await api<{ isExisting: boolean }>(
    `/public/appointments/existing-validation`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}
