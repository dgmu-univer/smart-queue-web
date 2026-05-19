'use server';

import { apiServer, extractApiError, ActionPromisifyResult } from '@/lib/api.server';
import { type AddExcludedSlotFormProps } from './add-excluded-slot';
import { type ExcludeSlotItem } from './types';
import { API_DATE_FORMAT } from '@/lib/date';
import { format } from 'date-fns';

export async function updateExcludedActions(formData: AddExcludedSlotFormProps): ActionPromisifyResult {
  const payload: Omit<ExcludeSlotItem, 'id'> = {
    date: format(formData.date, API_DATE_FORMAT),
    end_time: formData.endTime,
    start_time: formData.startTime,
  };
  try {
    await apiServer('/admin-settings/excluede-slots',
      { method: 'POST', body: JSON.stringify(payload) });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}

export async function deleteExcludedActions(slotId: number): ActionPromisifyResult {
  try {
    await apiServer(`/admin-settings/excluede-slots/${slotId.toString()}`,
      { method: 'DELETE' });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}
