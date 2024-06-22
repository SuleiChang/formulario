import { format } from 'date-fns';

export function formatDate(date: string) {
  return format(new Date(date), 'EEE MMM dd yyyy');
}

export function eq(a: any, b: any) {
  return a === b;
}

export function formatDateForInput(date: string) {
  return format(new Date(date), 'yyyy-MM-dd');
}
