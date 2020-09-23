export function swapKeysAndValues(object: Record<string, string>) {
  const newObject: Record<string, string> = {};
  Object.keys(object).forEach(key => {
    newObject[object[key]] = key;
  });
  return newObject;
}
