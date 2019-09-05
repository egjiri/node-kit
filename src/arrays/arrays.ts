export function nextItem(array: any[], currentItem: any): any {
  const index = array.indexOf(currentItem);
  const newIndex = index + 1 < array.length ? index + 1 : 0;
  return array[newIndex];
}

export function previousItem(array: any[], currentItem: any): any {
  const index = array.indexOf(currentItem);
  const newIndex = index - 1 >= 0 ? index - 1 : array.length - 1;
  return array[newIndex];
}
