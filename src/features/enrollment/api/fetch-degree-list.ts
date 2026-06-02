'use server';

import { apiServer } from '@/lib/api.server';
import { FetchDegreeListResponse } from './types';

export async function fetchDegreeList(): Promise<FetchDegreeListResponse> {
  return await apiServer('/public/degree-programs',
    { method: 'GET' });
}
