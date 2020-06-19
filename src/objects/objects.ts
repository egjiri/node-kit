import { underscore, camelize, dasherize } from '../strings/strings';

type objectWithStringKeys = { [key: string]: any };
type objectWithStringKeysAndValues = { [key: string]: string };

export function underscoreKeys(object: objectWithStringKeys) {
  return transformKeys(object, 'underscore');
}

export function camelizeKeys(object: objectWithStringKeys) {
  return transformKeys(object, 'camelize');
}

export function dasherizeKeys(object: objectWithStringKeys) {
  return transformKeys(object, 'dasherize');
}

export function isObject(value: any): boolean {
  return typeof value === 'object' && !Array.isArray(value) && value !== null && value !== undefined;
}

export function removeKeysWithBlankValues(object: objectWithStringKeys) {
  object = { ...object };
  const nullValues = [null, undefined];
  Object.keys(object).forEach(key => nullValues.includes(object[key]) && delete object[key]);
  return object;
}

export function swapKeysAndValues(object: objectWithStringKeysAndValues) {
  const newObject: objectWithStringKeysAndValues = {};
  Object.keys(object).forEach(key => {
    newObject[object[key]] = key;
  });
  return newObject;
}

function transformKeys(object: objectWithStringKeys, transform: transform) {
  object = { ... object };
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
