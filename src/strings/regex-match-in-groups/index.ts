export type matchGroup = { [key: string]: string };

export function regexMatchInGroups(str: string, regexStr: string): matchGroup {
  const groups: matchGroup = {};
  const regex = new RegExp(regexStr.replace(/\?<(.+?)>/g, ''));
  if (regex.test(str)) {
    const matches = str.match(regex) as RegExpMatchArray;
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
