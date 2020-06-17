export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeWords(str: string): string {
  return str.split(' ').map(word => {
    const exceptionWords = ['in', 'on', 'is', 'to', 'for', 'width', 'and', 'on', 'by', 'a', 'at'];
    return exceptionWords.includes(word) ? word.toLowerCase() : capitalize(word);
  }).join(' ');
}

export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

export function humanize(str: string): string {
  return str.split(/[_-\s]/).map(capitalize).join(' ');
}

export function addSeparator(str: string, separator = ','): string {
  return reverse(reverse(str).match(/.{1,3}/g).join(separator));
}

export function toNumber(str: string): number {
  const negativeNumber = str.startsWith('-');
  str = str.replace(/[^0-9.]/g, '');
  if (negativeNumber) {
    str = '-' + str;
  }
  return parseFloat(str);
}

export function dasherize(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-/, '')
    .toLowerCase();
}

export function deDasherize(str: string): string {
  return str.replace(/-/g, ' ');
}

export function camelize(str: string): string {
  return str.split(/[\s-_]/).map((word, index) => index === 0 ?  word : capitalize(word)).join('');
}

export function pluralize(str: string): string {
  return str.replace(/s$/, '') + 's';
}
