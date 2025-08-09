export function addYears(date: Date, years: number): Date {
  const newDate = new Date(date);
  newDate.setFullYear(date.getFullYear() + years);
  return newDate;
}
