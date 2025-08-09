export function withinXDays(date1: Date, date2: Date, daysDifference = 0): boolean {
  const msDifference = 1000 * 60 * 60 * 24 * daysDifference;
  return Math.abs(date1.getTime() - date2.getTime()) <= msDifference;
}
