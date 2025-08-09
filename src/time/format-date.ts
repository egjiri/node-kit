export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-us', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export const formatStandardDate = Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
}).format;
