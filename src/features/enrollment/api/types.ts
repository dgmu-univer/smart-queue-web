import { DegreeProgramsItem } from '@/features/dashboard/degree-programs';
import { WorkDateObject } from '@/features/dashboard/main-settings';

export interface GetDegreeProgramsResponse {
  degreePrograms: DegreeProgramsItem[]
  periodSettings: WorkDateObject
}
