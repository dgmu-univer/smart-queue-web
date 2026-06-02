import { dateAsApiString } from '@/lib/date';
import { FetchScheduleParams } from '../api/types';

export const toScheduleRange = (
  date: Date,
): FetchScheduleParams => ({
  from: dateAsApiString(date),
  to: dateAsApiString(date),
});
