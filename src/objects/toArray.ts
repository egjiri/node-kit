import { removeKeysWithBlankValues } from './remove-keys.js';

export function toArray(object: Record<string, unknown>) {
  return Object.keys(removeKeysWithBlankValues(object)).map(key => `${key}: ${object[key]}`);
}
