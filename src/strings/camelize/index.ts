import { capitalize } from '../capitalize';

export function camelize(str: string) {
  return str.split(/[\s-_]/).map((word, index) => index === 0 ? word : capitalize(word)).join('');
}
