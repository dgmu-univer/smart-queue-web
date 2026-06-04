'use server';

import { apiServer } from '@/lib/api.server';
import { EducationLevel } from './types';

export async function fetchAllEducationLevels(): Promise<EducationLevel[]> {
  return await apiServer('/degree-programs',
    { method: 'GET' });
}
