import { dateAsApiString } from '@/lib/date';
import { type MainSettingsFormProps } from './main-settings-form';
import { type LunchObject, type MainSettings } from './types';

function defineLunch(lunch: LunchObject): boolean {
  return !(lunch.end_time && lunch.start_time);
}

export function defineInitData(initialData?: MainSettings): MainSettingsFormProps | undefined {
  if (!initialData) {
    return undefined;
  }
  return {
    ...initialData,
    lunchOff: defineLunch(initialData.lunch),
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    lunch: formData.lunchOff
      ? {
          end_time: null,
          start_time: null,
        }
      : {
          end_time: formData.lunch.end_time ?? '',
          start_time: formData.lunch.start_time ?? '',
        },
  };
}
