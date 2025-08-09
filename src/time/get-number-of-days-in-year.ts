export function getNumberOfDaysInYear(year = new Date().getFullYear()): number {
  const startOfYear = new Date(year, 0, 1).getTime();
  const endOfYear = new Date(year + 1, 0, 1).getTime() - 1;
  const timeDiff = endOfYear - startOfYear;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}
