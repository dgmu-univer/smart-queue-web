import { apiServer } from '@/lib/api.server';
import { CalendarEvent } from '../model/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface Params {
  start: string
  end: string
}

export async function fetchAdmissions(params: Params): Promise<CalendarEvent[]> {
  const user = await getServerSession(authOptions);
  const degreeId = user?.user.username;
  console.log(`/appointments?from=${params.start}&to=${params.end}&degreeId=${degreeId ?? ''}`);
  return apiServer<CalendarEvent[]>(
    `/appointments?from=${params.start}&to=${params.end}&degreeId=${degreeId ?? ''}`,
    {
      method: 'GET',
    });
}
