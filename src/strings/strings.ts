export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

export function humanize(str: string): string {
  return str.split(/[_-\s]/).map(capitalize).join(' ')
}

export function addSeparator(str: string, separator = ','): string {
  return reverse(reverse(str).match(/.{1,3}/g).join(separator));
}

export function toNumber(str: string): number {
  str = str.replace(/[^0-9.]/g, '');
  return parseFloat(str);
}