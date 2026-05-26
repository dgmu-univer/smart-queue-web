import 'server-only';
import { fetchMainSettings } from '@/features/dashboard/main-settings';
import { fetchSlotSettings } from '@/features/dashboard/slot-settings';

export async function fetchCalendarConfig() {
  return Promise.all([
    fetchMainSettings(),
    fetchSlotSettings(),
  ]);
}
