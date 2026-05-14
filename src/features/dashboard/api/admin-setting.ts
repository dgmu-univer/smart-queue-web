import { apiServer } from '@/lib/api.server';
import { ExcludeSlotItem, MainSettings, SlotSettings } from './types';

export const adminSettingApi = {
  getMainSettings: async () => {
    return await apiServer<MainSettings>('/admin-settings/periods', { method: 'GET' });
  },
  getSlotSettings: async () => {
    return await apiServer<SlotSettings>('/admin-settings/slots', { method: 'GET' });
  },
  getNonWorkingDays: async () => {
    return await apiServer<string[]>('/admin-settings/non-working-days', { method: 'GET' });
  },
  getExcluedeSlotsSetting: async () => {
    return await apiServer<ExcludeSlotItem[]>('/admin-settings/excluede-slots', { method: 'GET' });
  },
};
