import { apiServer } from '@/lib/api.server';
import { ExcludeSlot, GetPeriodSettings, SlotRange } from './types';

export const adminSettingApi = {
  getPeriods: async () => {
    return await apiServer<GetPeriodSettings>('/admin-settings/periods', { method: 'GET' });
  },
  getSlot: async () => {
    return await apiServer<SlotRange>('/admin-settings/slots', { method: 'GET' });
  },
  getNonWorkingDays: async () => {
    return await apiServer<string[]>('/admin-settings/non-working-days', { method: 'GET' });
  },
  getExcluedeSlots: async () => {
    return await apiServer<ExcludeSlot[]>('/admin-settings/excluede-slots', { method: 'GET' });
  },
};
