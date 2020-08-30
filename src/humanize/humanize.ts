import { toNumber, humanize as humanizeString } from '../strings/strings';
import { Format, formatNumber } from '../numbers/numbers';

export default function humanize(value?: string, format?: Format): string {
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
