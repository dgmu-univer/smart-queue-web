import { dateAsApiString } from '@/lib/date';
import { CreateEducationLevelPayload } from '../api/types';
import { CreateNewLevelFormProps } from '../ui/create-new-level';

export const createPayload = (formData: CreateNewLevelFormProps): CreateEducationLevelPayload => {
  return {
    name: formData.name,
    pin: formData.pin,
    description: formData.description ?? '',
    settings: {
      periods: {
        work_date: {
          start_date: dateAsApiString(formData.startDate),
          end_date: dateAsApiString(formData.endDate),
        },
        work_time: {
          start_time: '09:00:00',
          end_time: '18:00:00',
        },
        lunch: {
          start_time: undefined,
          end_time: undefined,
        },
      },
      slots: {
        duration_minutes: 15,
        capacity_per_slot: 10,
      },
      nonWorkingDays: [],
      excludedSlots: [],
    },
  };
};
