'use server';

import { apiServer, ActionPromisifyResult } from '@/lib/api.server';
import { extractApiError } from '@/lib/extract-api-error';

export async function deleteExcludedSlot(degreeId: string, slotId: string): ActionPromisifyResult {
  try {
    await apiServer(`/degree-programs/${degreeId}/admin-settings/excluded-slots/${slotId}`,
      { method: 'DELETE' });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}
