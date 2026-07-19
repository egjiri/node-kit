import { homedir } from 'node:os';
import { isAbsolute, join, relative } from 'node:path';
import { isPathInsideOrEqual } from './is-path-inside-or-equal.js';

export function collapseTilde(path: string): string {
  const home = homedir();
  if (!isAbsolute(path) || !isPathInsideOrEqual(path, home)) {
    return path;
  }

  return join('~', relative(home, path));
}
