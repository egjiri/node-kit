import { addYears } from './add-years';

export function getYearlyDates(startDate: Date, endDate: Date): Date[] {
  let date = new Date(startDate);

  const dates: Date[] = [];
  while (date <= endDate) {
    dates.push(date);
    date = addYears(date, 1);
  }
  return dates;
}
