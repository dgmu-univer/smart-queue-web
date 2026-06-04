'use server';

import { apiServer } from '@/lib/api.server';
import { FetchMainSettingsResponse } from './types';

export async function fetchMainSettings(degreeId: string): Promise<FetchMainSettingsResponse> {
  return await apiServer(`/degree-programs/${degreeId}/admin-settings/periods`,
    { method: 'GET' });
}
