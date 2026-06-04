'use server';

import { ActionPromisifyResult } from '@/lib/api.server';
import { apiServer } from '@/lib/api.server';
import { extractApiError } from '@/lib/extract-api-error';
import { CreateEducationLevelPayload } from './types';

export async function createEducationLevel(payload: CreateEducationLevelPayload): ActionPromisifyResult {
  try {
    await apiServer('/degree-programs',
      { method: 'POST', body: JSON.stringify(payload) });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}
