'use server';

import { apiServer } from '@/lib/api.server';

export async function updateDataOnBackend(payload: any) {
  return await apiServer('/admin-settings/periods', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}
