export function removeKeys(object: Record<string, unknown>, ...keys: string[]) {
  const newObject: Record<string, unknown> = {};
  Object.keys(object).forEach(key => {
    if (!keys.includes(key)) {
      newObject[key] = object[key];
    }
  });
  return newObject;
}

export function removeKeysWithBlankValues(object: Record<string, unknown>) {
  const newObject: Record<string, unknown> = {};
  Object.keys(object).forEach(key => {
    const value = object[key];
    if (value !== null && value !== undefined) {
      newObject[key] = value;
    }
  });
  return newObject;
}
