'use server';

import { apiServer } from '@/lib/api.server';

export async function updateDataOnBackend(payload: any) {
  // Сервер делает запрос от своего имени — CORS и браузерный CSRF не мешают
  return await apiServer('/admin-settings/periods', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}
