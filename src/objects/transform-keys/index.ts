import { isObject } from '../is-object';
import { underscore, camelize, dasherize } from '../../strings';

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

function transformKeys(object: Record<string, unknown>, transform: transform) {
  const newObject: Record<string, unknown> = {};
  Object.keys(object).forEach(key => {
    let value = object[key];
    if (isObject(value)) {
      value = transformKeys(value as Record<string, unknown>, transform);
    }
    key = transformKey(key, transform);
    newObject[key] = value;
  });
  return newObject;
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
