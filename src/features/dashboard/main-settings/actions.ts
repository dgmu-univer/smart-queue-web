import { apiServer } from '@/lib/api.server';

export async function getMainSettingInitData() {
  return await apiServer('/admin-settings/periods', { method: 'GET' });
}


export async function updateMainSettings(formData: FormData) {
  'use server'
  return await apiServer('/admin-settings/periods', { method: 'GET', body: formData });
  // Mutate data
  // Revalidate cache
}
