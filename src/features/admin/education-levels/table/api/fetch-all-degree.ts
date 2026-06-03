'use server';

import { apiServer } from '@/lib/api.server';
import { GetDegreeResponseItem } from './types';

export async function fetchAllDegree(): Promise<GetDegreeResponseItem[]> {
  return await apiServer('/degree-programs',
    { method: 'GET' });
}
