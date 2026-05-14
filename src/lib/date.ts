import { formatDate } from 'date-fns';

export const payloadDate = (date: Date): string => {
  return formatDate(date, 'dd-MM-yyyy');
};
