'use server';

import { apiServer, ActionPromisifyResult } from '@/lib/api.server';
import { extractApiError } from '@/lib/extract-api-error';

import { MainSettingsFormProps } from './main-settings-form';
import { defineUpdatePayload } from './utils';

export async function updateMainSettingsActions(formData: MainSettingsFormProps): ActionPromisifyResult {
  const payload = defineUpdatePayload(formData);
  try {
    await apiServer('/admin-settings/periods', { method: 'PATCH', body: JSON.stringify(payload) });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}
