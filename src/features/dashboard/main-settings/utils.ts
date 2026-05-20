import { dateAsApiString } from '@/lib/date';
import { type MainSettingsFormProps } from './main-settings-form';
import { type MainSettings } from './types';

export function defineInitData(initialData?: MainSettings): MainSettingsFormProps | undefined {
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

export function defineUpdatePayload(formData: MainSettingsFormProps): MainSettings {
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
