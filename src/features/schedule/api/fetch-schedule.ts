'use server';

import { apiServer } from '@/lib/api.server';
import { FetchScheduleParams, FetchScheduleResponse } from './types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { dateAsApiString } from '@/lib/date';
import { generateMockSlots } from '../lib/mock-schedule';

export async function fetchSchedule(params?: FetchScheduleParams, mock?: boolean, init?: RequestInit): Promise<FetchScheduleResponse> {
  const user = await getServerSession(authOptions);
  const degreeId = user?.user.username ?? '';

  const defaultDate = dateAsApiString(new Date()); // Assert type
  const from = params?.from ?? defaultDate;
  const to = params?.to ?? defaultDate;

  if (mock) {
    return await generateMockSlots({ from: '2026-06-01', to: '2026-06-07' });
  }

  return await apiServer(`/appointments?from=${from}&to=${to}&degreeId=${degreeId}`, {
    method: 'GET',
    ...init,
  });
}
