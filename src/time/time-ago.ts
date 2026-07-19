export function timeAgo(date: Date, style: 'long' | 'narrow' = 'long'): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds === 0) {
    return 'now';
  }

  const formatter = new Intl.RelativeTimeFormat('en', { style, numeric: 'always' });

  if (seconds < 60) {
    return formatter.format(-seconds, 'second');
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return formatter.format(-minutes, 'minute');
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return formatter.format(-hours, 'hour');
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return formatter.format(-days, 'day');
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return formatter.format(-months, 'month');
  }

  const years = Math.floor(months / 12);
  return formatter.format(-years, 'year');
}
