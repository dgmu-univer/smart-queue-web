'use server';

import { apiServer, ActionPromisifyResult } from '@/lib/api.server';
import { extractApiError } from '@/lib/extract-api-error';
import { UpdateSlotSettingsResponse } from './types';

export async function updateSlotSettingsActions(degreeId: string, payload: UpdateSlotSettingsResponse): ActionPromisifyResult {
  try {
    await apiServer(`/degree-programs/${degreeId}/admin-settings/slots`,
      { method: 'PATCH', body: JSON.stringify(payload) });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}
