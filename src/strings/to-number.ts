export function toNumber(str: string): number {
  const negativeNumber = str.startsWith('-');
  str = str.replace(/[^0-9.]/g, '');
  if (negativeNumber) {
    str = '-' + str;
  }
  return parseFloat(str);
}
