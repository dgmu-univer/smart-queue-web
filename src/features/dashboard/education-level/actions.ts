'use server';

import { apiServer } from '@/lib/api.server';
import { updateTag } from 'next/cache';
import { EducationLevelItem } from './types';
import { AddEducationLevelFormProps } from './add-education-level';

export async function updateEducationLevel(formData: AddEducationLevelFormProps) {
  const payload: Omit<EducationLevelItem, 'id'> = {
    pin: formData.pin,
    name: formData.name,
    description: formData.description ?? null,
  };
  console.log(payload);
  await apiServer('/admin-settings/degree-programs',
    { method: 'POST', body: JSON.stringify(payload) });
  updateTag('education-level-init');
}

export async function deleteEducationLevel(id: string) {
  await apiServer(`/admin-settings/degree-programs/${id}`,
    { method: 'DELETE' });
  updateTag('education-level-init');
}
