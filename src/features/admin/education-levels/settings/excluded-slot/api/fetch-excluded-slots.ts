import 'server-only';
import { apiServer } from '@/lib/api.server';
import { FetchExcludedSlotsResponse } from './types';

export async function fetchExcludedSlots(degreeId: string): Promise<FetchExcludedSlotsResponse> {
  return await apiServer(`/degree-programs/${degreeId}/admin-settings/excluded-slots`,
    { method: 'GET' });
}
