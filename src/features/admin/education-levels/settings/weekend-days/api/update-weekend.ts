'use server';

import { apiServer, ActionPromisifyResult } from '@/lib/api.server';
import { extractApiError } from '@/lib/extract-api-error';

export async function updateWeekendActions(degreeId: string, payload: string[]): ActionPromisifyResult {
  try {
    await apiServer(`/degree-programs/${degreeId}/admin-settings/non-working-days`,
      { method: 'PUT', body: JSON.stringify(payload) });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}
