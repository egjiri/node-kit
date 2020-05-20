import * as underscore from 'underscore.string/underscored';
import { camelize, dasherize } from '../strings/strings';

export function underscoreKeys(object: object): object {
  return transformKeys(object, 'underscore');
}

export function camelizeKeys(object: object): object {
  return transformKeys(object, 'camelize');
}

export function dasherizeKeys(object: object): object {
  return transformKeys(object, 'dasherize');
}

export function isObject(value: any): boolean {
  return typeof value === 'object' && !Array.isArray(value) && value !== null && value !== undefined;
}

function transformKeys(object, transform) {
  object = Object.assign({}, object);
  for (let key in object) {
    // only manipulate property not from the prototype
    if (object.hasOwnProperty(key)) {
      let value = object[key];
      if (isObject(value)) {
        value = transformKeys(value, transform);
      }
      delete object[key];
      key = transformKey(key, transform);
      object[key] = value;
    }
  }
  return object;
}

type transform = 'underscore' | 'camelize' | 'dasherize';

function transformKey(key: string, transform: transform): string {
  if (transform === 'underscore') {
    return underscore(key);
  } else if (transform === 'camelize') {
    return camelize(key);
  } else if (transform === 'dasherize') {
    return dasherize(key);
  } else {
    return key;
  }
}
