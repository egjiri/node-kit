import { toString } from '../to-string';

export type Format = 'percentage' | 'currency';

export function formatNumber(num: number, format?: Format) {
  const value = toString(num);
  if (format === 'percentage') {
    return value + '%';
  } else if (format === 'currency') {
    return '$' + value;
  } else {
    return value;
  }
}
