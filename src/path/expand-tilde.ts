import { homedir } from 'node:os';
import { join, sep } from 'node:path';

export function expandTilde(path: string): string {
  if (path === '~') {
    return homedir();
  }

  if (!path.startsWith(`~${sep}`)) {
    return path;
  }

  return join(homedir(), path.slice(2));
}
