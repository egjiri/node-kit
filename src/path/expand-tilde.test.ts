import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { expandTilde } from './expand-tilde';
import type { Cases } from 'testing';

describe('expandTilde', () => {
  const home = homedir();
  const relativePath = join('relative', 'path');
  const absolutePath = dirname(home);

  const cases: Cases<typeof expandTilde> = [
    ['expands the home shorthand', ['~'], home],
    ['expands a home descendant', [join('~', 'child')], join(home, 'child')],
    ['leaves a relative path unchanged', [relativePath], relativePath],
    ['leaves an absolute path unchanged', [absolutePath], absolutePath],
    ['leaves another user shorthand unchanged', ['~other'], '~other'],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    expect(expandTilde(...args)).toBe(expected);
  });
});
