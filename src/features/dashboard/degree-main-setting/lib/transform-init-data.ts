import { FetchMainSettingsResponse } from '../api/types';
import { DegreeMainSettingFormProps } from './schema';

export function transformInitData(initialData?: FetchMainSettingsResponse):
  DegreeMainSettingFormProps | undefined {
  if (!initialData) {
    return undefined;
  }
  return {
    ...initialData,
    lunchOff: initialData.lunch === null,
    work_date: {
      end_date: new Date(initialData.work_date.end_date),
      start_date: new Date(initialData.work_date.start_date),
    },
  };
}
