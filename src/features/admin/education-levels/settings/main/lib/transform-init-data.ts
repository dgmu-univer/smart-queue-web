import { FetchMainSettingsResponse } from '../api/types';
import { DegreeMainSettingFormProps } from './schema';

export function transformInitData(initialData?: FetchMainSettingsResponse):
  DegreeMainSettingFormProps | undefined {
  if (!initialData) {
    return undefined;
  }

  const lunchOff = initialData.lunch.start_time === null

  return {
    ...initialData,
    lunchOff,
    lunch: {
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      end_time: lunchOff ? '' : initialData.lunch.end_time as string,
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      start_time: lunchOff ? '' : initialData.lunch.start_time as string,
    },
    work_date: {
      end_date: new Date(initialData.work_date.end_date),
      start_date: new Date(initialData.work_date.start_date),
    },
  };
}
