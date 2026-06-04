'use server';

import { apiServer, ActionPromisifyResult } from '@/lib/api.server';
import { extractApiError } from '@/lib/extract-api-error';
import { UpdateMainSettingsPayload } from './types';

export async function updateMainSettingsActions(degreeId: string, payload: UpdateMainSettingsPayload): ActionPromisifyResult {
  try {
    await apiServer(`/degree-programs/${degreeId}/admin-settings/periods`,
      { method: 'PATCH', body: JSON.stringify(payload) });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}
