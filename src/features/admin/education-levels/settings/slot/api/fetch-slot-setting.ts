import 'server-only';
import { apiServer } from '@/lib/api.server';
import { FetchSlotSettingsResponse } from './types';

export async function fetchSlotSettings(degreeId: string): Promise<FetchSlotSettingsResponse> {
  return await apiServer(`/degree-programs/${degreeId}/admin-settings/slots`,
    { method: 'GET' });
}
