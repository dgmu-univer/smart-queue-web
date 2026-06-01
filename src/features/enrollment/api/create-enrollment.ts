import { api } from '@/lib/api';
import { CreateEnrollmentPayload } from './types';

export async function createEnrollment(payload: CreateEnrollmentPayload): Promise<number> {
  return await api<number>(
    `/public/appointments`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}
