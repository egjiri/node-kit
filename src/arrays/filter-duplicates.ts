export function filterDuplicates<T>(array: T[]): T[] {
  const filteredArr: T[] = [];
  const strArray: string[] = [];
  for (const item of array) {
    const strValue = JSON.stringify(item);
    if (!strArray.find(value => value === strValue)) {
      filteredArr.push(item);
      strArray.push(strValue);
    }
  }
  return filteredArr;
}
