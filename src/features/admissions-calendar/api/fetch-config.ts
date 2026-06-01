import 'server-only';

import { fetchMainSettings } from '@/features/dashboard/degree-main-setting';
import { fetchSlotSettings } from '@/features/dashboard/degree-slot-settings';

export async function fetchCalendarConfig() {
  return Promise.all([
    fetchMainSettings('1'),
    fetchSlotSettings('1'),
  ]);
}
