export function trim(str: string) {
  return str.replace(/^\s+|\s+$/g, '');
}

export function underscore(str: string) {
  return trim(str)
    .replace(/([a-z\d])([A-Z]+)/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase();
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeWords(str: string) {
  return str.split(' ').map(word => {
    const exceptionWords = ['in', 'on', 'is', 'to', 'for', 'width', 'and', 'on', 'by', 'a', 'at'];
    return exceptionWords.includes(word) ? word.toLowerCase() : capitalize(word);
  }).join(' ');
}

export function capitalizeSentences(str: string) {
  return str.split('. ').map(word => capitalize(word)).join('. ');
}

export function reverse(str: string) {
  return str.split('').reverse().join('');
}

export function humanize(str: string) {
  return str.split(/[_-\s]/).map(capitalize).join(' ');
}

export function addSeparator(str: string, separator = ',') {
  const matches = reverse(str).match(/.{1,3}/g);
  return matches ? reverse(matches.join(separator)) : '';
}

export function toNumber(str: string): number {
  const negativeNumber = str.startsWith('-');
  str = str.replace(/[^0-9.]/g, '');
  if (negativeNumber) {
    str = '-' + str;
  }
  return parseFloat(str);
}

export function dasherize(str: string) {
  return str
    .replace(/([A-Z])/g, '-$1')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-/, '')
    .toLowerCase();
}

export function deDasherize(str: string) {
  return str.replace(/-/g, ' ');
}

export function camelize(str: string) {
  return str.split(/[\s-_]/).map((word, index) => index === 0 ?  word : capitalize(word)).join('');
}

export function pluralize(str: string) {
  return str.replace(/s$/, '') + 's';
}

type matchGroup = { [key: string]: string };

export function regexMatchInGroups(str: string, regexStr: string): matchGroup {
  const groups: matchGroup = {};
  const regex = new RegExp(regexStr.replace(/\?<(.+?)>/g, ''));
  if (regex.test(str)) {
    const matches = str.match(regex) || [];
    const groupMatches = regexStr.match(/\?<(.+?)>/g) || [];
    groupMatches.forEach(group => {
      const name = group.replace(/^\?</, '').replace(/>$/, '');
      const stringPrefix = regexStr.substr(0, regexStr.indexOf(group));
      const index = stringPrefix.replace(/\(\?:/g, '').replace(/[^(]/g, '').length;
      groups[name] = matches[index];
    });
  }
  return groups;
}
