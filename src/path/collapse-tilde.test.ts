import { homedir } from 'node:os';
import { basename, dirname, join } from 'node:path';
import { collapseTilde } from './collapse-tilde';
import type { Cases } from 'testing';

describe('collapseTilde', () => {
  const home = homedir();
  const homeParent = dirname(home);
  const sibling = join(homeParent, `${basename(home)}-other`);
  const relativePath = join('relative', 'path');

  const cases: Cases<typeof collapseTilde> = [
    ['collapses the home directory', [home], '~'],
    ['collapses a home descendant', [join(home, 'child')], join('~', 'child')],
    ['leaves a similarly named sibling unchanged', [sibling], sibling],
    ['leaves a path outside home unchanged', [homeParent], homeParent],
    ['leaves a relative path unchanged', [relativePath], relativePath],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    expect(collapseTilde(...args)).toBe(expected);
  });
});
