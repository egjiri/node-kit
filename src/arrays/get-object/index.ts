import { isEmpty } from '../is-empty';

export function firstObject<T>(array: T[]) {
  return isEmpty(array) ? null : array[0];
}

export function lastObject<T>(array: T[]) {
  return isEmpty(array) ? null : array[array.length - 1];
}

export function nextObject<T>(array: T[], currentItem: T, repeat = false) {
  const index = array.indexOf(currentItem);
  if (index + 1 < array.length) {
    return array[index + 1];
  } else {
    return repeat ? firstObject(array) : null;
  }
}

export function previousObject<T>(array: T[], currentItem: T, repeat = false) {
  const index = array.indexOf(currentItem);
  if (index - 1 >= 0) {
    return array[index - 1];
  } else {
    return repeat ? lastObject(array) : null;
  }
}
