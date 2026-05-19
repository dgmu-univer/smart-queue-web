'use server';

import { apiServer } from '@/lib/api.server';
import { type SlotSettingsFormProps } from './slot-settings-form';

export async function updateSlotSettingsActions(formData: SlotSettingsFormProps) {
  return await apiServer('/admin-settings/slots',
    { method: 'PATCH', body: JSON.stringify(formData) });
}
