import { formatNumber } from '../numbers/format-number.js';
import { humanize as humanizeString, toNumber } from '../strings/index.js';
import type { Format } from '../numbers/format-number.js';

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
