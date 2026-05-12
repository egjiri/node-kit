import { capitalize } from './capitalize.js';

export function humanize(str: string) {
  return str.split(/[_-\s]/).map(capitalize).join(' ');
}
