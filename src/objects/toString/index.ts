import { toArray } from '../toArray';

export function toString(styles: Record<string, unknown>, delimiter = '\n') {
  return toArray(styles).join(delimiter);
}
