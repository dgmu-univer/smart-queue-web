import { api } from '@/lib/api';
import { CreateEnrollmentPayload, CreateEnrollmentResponse } from './types';

export async function createEnrollment(payload: CreateEnrollmentPayload): Promise<CreateEnrollmentResponse> {
  return await api<CreateEnrollmentResponse>(
    `/public/appointments`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}
