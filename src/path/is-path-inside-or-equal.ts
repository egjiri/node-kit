import { isAbsolute, relative, resolve, sep } from 'node:path';

/** Checks lexical path containment without resolving filesystem symlinks. */
export function isPathInsideOrEqual(path: string, parentDirectory: string): boolean {
  const relativePath = relative(resolve(parentDirectory), resolve(path));
  const isOutsideParentDirectory = relativePath === '..' || relativePath.startsWith(`..${sep}`);
  const isOnDifferentRoot = isAbsolute(relativePath);

  return !isOutsideParentDirectory && !isOnDifferentRoot;
}
