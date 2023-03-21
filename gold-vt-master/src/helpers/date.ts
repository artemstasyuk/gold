import { toDate, formatInTimeZone, zonedTimeToUtc, format } from 'date-fns-tz';
import { parseJSON } from 'date-fns';

type DateInput = string | number | Date

export const timeZone = import.meta.env.VITE_BACKEND_TIMEZONE || 'Europe/Moscow';

export function createDate (): Date {
  return zonedTimeToUtc(new Date(), timeZone);
}

export function appendTimezoneOffset (date: string): string {
  const utc = toDate(date);

  const formattedDate = format(utc, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });

  return `${formattedDate.replace(' ', 'T')}`;
}

export function convertToAppTimezone (date: DateInput): Date {
  const utc = parseJSON(date);
  return zonedTimeToUtc(utc, timeZone);
}

export function formatToAppTimezone (date: DateInput, format: string = 'yyyy-MM-dd HH:mm:ssXXX'): string {
  const utc = parseJSON(date);
  return formatInTimeZone(utc, timeZone, format);
}

export function parseDateFromTimeZone (date: string): Date {
  const [value] = date.split('+');
  const formattedDate = value.replace('T', ' ');
  return new Date(formattedDate);
}
