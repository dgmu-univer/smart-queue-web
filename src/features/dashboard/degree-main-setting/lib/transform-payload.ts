import { dateAsApiString } from '@/lib/date';
import { UpdateMainSettingsPayload } from '../api/types';
import { DegreeMainSettingFormProps } from './schema';

export function transformPayload(formData: DegreeMainSettingFormProps): UpdateMainSettingsPayload {
  return {
    work_time: formData.work_time,
    work_date: {
      end_date: dateAsApiString(formData.work_date.end_date),
      start_date: dateAsApiString(formData.work_date.start_date),
    },
    lunch: formData.lunchOff
      ? null
      : {
          end_time: formData.lunch?.end_time ?? '',
          start_time: formData.lunch?.start_time ?? '',
        },
  };
}
