import { toNumber, humanize as humanizeString } from '../strings/strings';
import { format, formatNumber } from '../numbers/numbers';

export default function humanize(value?: string, format?: format): string {
  value = value || '';
  if (format) {
    const number = toNumber(value);
    if (number) {
      return formatNumber(number, format);
    } else {
      return 'N/A';
    }
  } else {
    return humanizeString(value);
  }
}
