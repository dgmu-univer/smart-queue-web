'use server';

import { apiServer, extractApiError, ActionPromisifyResult } from '@/lib/api.server';
import { API_DATE_FORMAT } from '@/lib/date';
import { format, isValid } from 'date-fns';

export async function updateWeekendActions(formData: Date[]): Promise<ActionPromisifyResult> {
  const payload = formData
    .filter(date => isValid(date)) // Исключаем невалидные даты, чтобы format() не упал с ошибкой
    .map(date => format(date, API_DATE_FORMAT));
  try {
    await apiServer('/admin-settings/non-working-days',
      { method: 'PUT', body: JSON.stringify(payload) });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}
