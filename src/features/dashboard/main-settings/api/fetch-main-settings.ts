import 'server-only';
import { apiServer } from '@/lib/api.server';
import { MainSettings } from '../types';

export async function fetchMainSettings(): Promise<MainSettings> {
  return await apiServer('/admin-settings/periods',
    { method: 'GET' });
}
