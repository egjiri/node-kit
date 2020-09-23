export function dasherize(str: string) {
  return str
    .replace(/([A-Z])/g, '-$1')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-/, '')
    .toLowerCase();
}
