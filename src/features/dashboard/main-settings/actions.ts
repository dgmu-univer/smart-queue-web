'use server';

import { apiServer } from '@/lib/api.server';
import { MainSettingsFormProps } from './main-settings-form';
import { defineUpdatePayload } from './utils';

export async function updateMainSettingsActions(formData: MainSettingsFormProps) {
  const payload = defineUpdatePayload(formData);
  console.log('Payload', payload)
  await apiServer('/admin-settings/periods', { method: 'PATCH', body: JSON.stringify(payload) });
}
