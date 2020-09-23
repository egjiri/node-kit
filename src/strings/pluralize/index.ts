export function pluralize(str: string, count?: number) {
  if (count === 1) {
    return str;
  }
  if (str.match(/[^aeiou]y$/)) {
    return str.replace(/y$/, 'ies');
  } else if (str.match(/[sx]$|[sc]h$/)) {
    return str + 'es';
  } else {
    return str + 's';
  }
}

export function pluralizeWithCount(count: number, singular: string, plural = pluralize(singular, count)) {
  return `${count} ${plural}`;
}
