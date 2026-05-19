'use server';

import { apiServer, extractApiError, ActionPromisifyResult } from '@/lib/api.server';
import { type SlotSettingsFormProps } from './slot-settings-form';

export async function updateSlotSettingsActions(formData: SlotSettingsFormProps): Promise<ActionPromisifyResult> {
  try {
    await apiServer('/admin-settings/slots',
      { method: 'PATCH', body: JSON.stringify(formData) });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}
