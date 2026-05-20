'use server';

import { apiServer, extractApiError, ActionPromisifyResult } from '@/lib/api.server';
import { MainSettingsFormProps } from './main-settings-form';
import { defineUpdatePayload } from './utils';

export async function updateMainSettingsActions(formData: MainSettingsFormProps): Promise<ActionPromisifyResult> {
  const payload = defineUpdatePayload(formData);
  console.log(payload);
  try {
    await apiServer('/admin-settings/periods', { method: 'PATCH', body: JSON.stringify(payload) });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}
