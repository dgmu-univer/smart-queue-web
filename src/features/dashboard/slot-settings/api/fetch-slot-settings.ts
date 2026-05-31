import 'server-only';
import { SlotSettings } from '../slot-settings-form';
import { apiServer } from '@/lib/api.server';

export async function fetchSlotSettings(): Promise<SlotSettings> {
  return await apiServer('/admin-settings/slots',
    { method: 'GET' });
}
