import { toArray } from './toArray.js';

export function toString(styles: Record<string, unknown>, delimiter = '\n') {
  return toArray(styles).join(delimiter);
}
