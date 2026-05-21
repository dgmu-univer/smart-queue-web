'use server';

import { apiServer, extractApiError, ActionPromisifyResult } from '@/lib/api.server';
import { type DegreeProgramsItem } from './types';
import { AddEducationLevelFormProps } from './add-degree-programs';

export async function createDegreeProgram(formData: AddEducationLevelFormProps): ActionPromisifyResult {
  const payload: Omit<DegreeProgramsItem, 'id'> = {
    pin: formData.pin,
    name: formData.name,
    description: formData.description ?? '',
  };
  try {
    await apiServer('/degree-programs',
      { method: 'POST', body: JSON.stringify(payload) });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}

export async function removeDegreeProgram(id: number): ActionPromisifyResult {
  try {
    await apiServer(`/degree-programs/${id.toString()}`,
      { method: 'DELETE' });
    return { success: true };
  } catch (error) {
    const { status, message } = extractApiError(error);
    return { success: false, error: { status, message } };
  }
}
