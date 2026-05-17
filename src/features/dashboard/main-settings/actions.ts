import { apiServer } from '@/lib/api.server';
import { MainSettings } from './types';

export async function getMainSettingInitData(): Promise<MainSettings> {
  return await apiServer('/admin-settings/periods',
    { method: 'GET', next: { tags: ['main-settings-init'], revalidate: false } });
}

export async function updateMainSettingsActions(formData: FormData) {
  'use server';
  return await apiServer('/admin-settings/periods', { method: 'PATCH', body: formData });
  // Mutate data
  // Revalidate cache
}
