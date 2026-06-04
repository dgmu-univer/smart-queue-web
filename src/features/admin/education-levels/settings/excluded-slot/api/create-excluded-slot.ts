'use server';

import { apiServer, ActionPromisifyResult } from '@/lib/api.server';
import { extractApiError } from '@/lib/extract-api-error';
import { CreateExcludedSlotPayload } from './types';

export async function createExcludedSlot(degreeId: string, payload: CreateExcludedSlotPayload): ActionPromisifyResult {
  try {
    await apiServer(`/degree-programs/${degreeId}/admin-settings/excluded-slots`,
      { method: 'POST', body: JSON.stringify(payload) });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}
