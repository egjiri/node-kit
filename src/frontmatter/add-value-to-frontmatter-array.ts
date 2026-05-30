import { extractFrontmatter } from './extract-frontmatter.js';
import { findFrontmatterField } from './find-frontmatter-field.js';
import { getFrontmatterFieldArrayValues } from './get-frontmatter-field-array-values.js';

export function addValueToFrontmatterArray(content: string, key: string, value: string): { content: string; valueWasPresent: boolean } {
  const { frontmatterYaml, markdownBody } = extractFrontmatter(content);
  const { frontmatterLines, fieldLines } = findFrontmatterField(frontmatterYaml, key);
  const values = fieldLines ? getFrontmatterFieldArrayValues(fieldLines, key) ?? [] : [];
  const updatedFieldLines = [
    `${key}:`,
    ...[...new Set([...values, value])]
      .sort((first, second) => first.localeCompare(second))
      .map(sortedValue => `  - ${sortedValue}`),
  ];

  if (fieldLines) {
    frontmatterLines.splice(frontmatterLines.indexOf(fieldLines[0]), fieldLines.length, ...updatedFieldLines);
  } else {
    frontmatterLines.push(...updatedFieldLines);
  }

  return {
    content: `---\n${frontmatterLines.join('\n')}\n---\n${markdownBody}`,
    valueWasPresent: values.includes(value),
  };
}
