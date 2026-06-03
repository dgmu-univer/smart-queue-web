'use server';

import { ActionPromisifyResult } from '@/lib/api.server';
import { apiServer } from '@/lib/api.server';
import { extractApiError } from '@/lib/extract-api-error';

export async function deleteDegree(id: number): ActionPromisifyResult {
  try {
    await apiServer(`/degree-programs/${id.toString()}`,
      { method: 'DELETE' });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}
