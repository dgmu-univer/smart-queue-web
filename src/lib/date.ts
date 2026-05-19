import { formatDate } from 'date-fns';

export const API_DATE_FORMAT = 'yyyy-MM-dd'

export const dateAsApiString = (date: Date): string => {
  return formatDate(date, API_DATE_FORMAT);
};

const today = new Date();
today.setHours(0, 0, 0, 0);

export const disabledMonth = {
  endMonth: new Date(today.getFullYear(), 7, 1),
  startMonth: new Date(today.getFullYear(), 4, 1),
};