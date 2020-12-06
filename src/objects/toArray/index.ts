import { removeKeysWithBlankValues } from '../remove-keys';

export function toArray(object: Record<string, unknown>) {
  return Object.keys(removeKeysWithBlankValues(object)).map(key => `${key}: ${object[key]}`);
}
