import { basename, dirname, join, parse, resolve, sep } from 'node:path';
import { isPathInsideOrEqual } from './is-path-inside-or-equal';
import type { Cases } from 'testing';

describe('isPathInsideOrEqual', () => {
  const root = parse(resolve()).root;
  const parent = join(root, 'repo');
  const sibling = join(dirname(parent), `${basename(parent)}-other`);
  const normalizedDescendant = [parent, '.', 'child', '..', 'nested'].join(sep);
  const normalizedSibling = [parent, '..', basename(sibling)].join(sep);

  const cases: Cases<typeof isPathInsideOrEqual> = [
    ['accepts an equal path', [parent, parent], true],
    ['accepts a direct descendant', [join(parent, 'child'), parent], true],
    ['accepts a nested descendant', [join(parent, 'child', 'nested'), parent], true],
    ['rejects a sibling-prefix path', [sibling, parent], false],
    ['normalizes dot and dot-dot segments inside the parent', [normalizedDescendant, parent], true],
    ['rejects a normalized path outside the parent', [normalizedSibling, parent], false],
    ['accepts relative inputs', [join('repo', 'child'), 'repo'], true],
    ['accepts descendants of a root directory', [join(root, 'child'), root], true],
    ['accepts trailing separators', [`${join(parent, 'child')}${sep}`, `${parent}${sep}`], true],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    expect(isPathInsideOrEqual(...args)).toBe(expected);
  });
});
