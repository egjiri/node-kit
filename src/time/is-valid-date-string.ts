export function isValidDateString(value: string): boolean {
  return [
    /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
    /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
  ].some(pattern => value.match(pattern));
}
