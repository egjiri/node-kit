import { extractFrontmatter } from './extract-frontmatter.js';
import { findFrontmatterField } from './find-frontmatter-field.js';
import { getFrontmatterFieldArrayValues } from './get-frontmatter-field-array-values.js';

export function getFrontmatterArrayProperty(content: string, propertyName: string): string[] | undefined {
  const { frontmatterYaml } = extractFrontmatter(content);

  const { fieldLines } = findFrontmatterField(frontmatterYaml, propertyName);
  if (!fieldLines) {
    return;
  }

  return getFrontmatterFieldArrayValues(fieldLines, propertyName);
}
