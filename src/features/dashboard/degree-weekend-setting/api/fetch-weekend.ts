import 'server-only';
import { apiServer } from '@/lib/api.server';

export async function fetchWeekend(degreeId: string): Promise<string[]> {
  return await apiServer(`/degree-programs/${degreeId}/admin-settings/non-working-days`,
    { method: 'GET' });
}
