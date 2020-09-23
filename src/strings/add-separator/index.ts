import { reverse } from '../reverse';

export function addSeparator(str: string, separator = ',') {
  const matches = reverse(str).match(/.{1,3}/g);
  return matches ? reverse(matches.join(separator)) : '';
}
