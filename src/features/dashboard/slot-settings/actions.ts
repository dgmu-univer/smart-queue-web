'use server';

import { apiServer } from '@/lib/api.server';
import { type SlotSettingsFormProps } from './slot-settings-form';

export async function updateSlotSettingsActions(formData: SlotSettingsFormProps) {
  const payload = {
    duration_minutes: Number(formData.duration_minutes),
    capacity_per_slot: Number(formData.capacity_per_slot),
  };
  await apiServer('/admin-settings/slots', { method: 'PATCH', body: JSON.stringify(payload) });
}
