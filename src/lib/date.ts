import { formatDate } from 'date-fns';

export const API_DATE_FORMAT = 'yyyy-MM-dd'

export const dateAsApiString = (date: Date): string => {
  return formatDate(date, API_DATE_FORMAT);
};
