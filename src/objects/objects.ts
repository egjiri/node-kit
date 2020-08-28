import { underscore, camelize, dasherize } from '../strings/strings';

type transform = 'underscore' | 'camelize' | 'dasherize';

export function underscoreKeys(object: Record<string, unknown>) {
  return transformKeys(object, 'underscore');
}

export function camelizeKeys(object: Record<string, unknown>) {
  return transformKeys(object, 'camelize');
}

export function dasherizeKeys(object: Record<string, unknown>) {
  return transformKeys(object, 'dasherize');
}

export function isObject(value: any): boolean {
  return typeof value === 'object' && !Array.isArray(value) && value !== null && value !== undefined;
}

export function removeKeysWithBlankValues(object: Record<string, unknown>) {
  object = { ...object };
  Object.keys(object).forEach(key => {
    const value = object[key];
    if (value === null || value === undefined) {
      delete object[key]
    }
  });
  return object;
}

export function swapKeysAndValues(object: Record<string, string>) {
  const newObject: Record<string, string> = {};
  Object.keys(object).forEach(key => {
    newObject[object[key]] = key;
  });
  return newObject;
}

function transformKeys(object: Record<string, unknown>, transform: transform) {
  object = { ... object };
  for (let key in object) {
    // only manipulate property not from the prototype
    if (object.hasOwnProperty(key)) {
      let value = object[key];
      if (isObject(value)) {
        value = transformKeys(value as Record<string, unknown>, transform);
      }
      delete object[key];
      key = transformKey(key, transform);
      object[key] = value;
    }
  }
  return object;
}

function transformKey(key: string, transform: transform): string {
  if (transform === 'underscore') {
    return underscore(key);
  } else if (transform === 'camelize') {
    return camelize(key);
  } else {
    return dasherize(key);
  }
}
