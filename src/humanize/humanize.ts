import { formatNumber } from '../numbers/format-number';
import { humanize as humanizeString, toNumber } from '../strings';
import type { Format } from '../numbers/format-number';

export function humanize(value?: string, format?: Format): string {
  value = value || '';
  if (format) {
    const number = toNumber(value);
    if (isNaN(number)) {
      return 'N/A';
    } else {
      return formatNumber(number, format);
    }
  } else {
    return humanizeString(value);
  }
}
