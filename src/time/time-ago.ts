export function timeAgo(date: Date): string {
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
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
  return formatter.format(-days, 'day');
}
