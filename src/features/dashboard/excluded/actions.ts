'use server';

import { apiServer } from '@/lib/api.server';
import { type AddExcludedSlotFormProps } from './add-excluded-slot';
import { type ExcludeSlotItem } from './types';
import { API_DATE_FORMAT } from '@/lib/date';
import { format } from 'date-fns';

export async function updateExcludedActions(formData: AddExcludedSlotFormProps) {
  const payload: ExcludeSlotItem = {
    id: undefined,
    date: format(formData.date, API_DATE_FORMAT),
    end_time: formData.endTime,
    start_time: formData.startTime,
  };
  return await apiServer('/admin-settings/excluede-slots',
    { method: 'POST', body: JSON.stringify(payload) });
}
