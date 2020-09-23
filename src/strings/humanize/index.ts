import { capitalize } from '../capitalize';

export function humanize(str: string) {
  return str.split(/[_-\s]/).map(capitalize).join(' ');
}
