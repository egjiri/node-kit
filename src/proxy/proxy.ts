import { isArray } from 'util';

export default function proxy<T extends Record<string, unknown> | Record<string, unknown>[]>(target: T, properties: Record<string, unknown>) {
  return new Proxy(target, {
    get: (target, prop) => {
      if (prop in target) {
        return getOwnProperties(prop, target);
      } else {
        return getCustomProperties(prop, properties);
      }
    },
  });
}

function getOwnProperties(property: string | symbol | number, target: Record<string, unknown> | Record<string, unknown>[]) {
  if (isArray(target)) {
    return target[property as number];
  } else {
    return target[property as string];
  }
}

function getCustomProperties(property: string | symbol | number, properties: Record<string, unknown>) {
  for (const key in properties) {
    if (property === key && Object.prototype.hasOwnProperty.call(properties, key)) {
      return properties[key];
    }
  }
}
