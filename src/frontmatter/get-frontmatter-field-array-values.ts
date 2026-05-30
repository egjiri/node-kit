export function getFrontmatterFieldArrayValues([fieldLine, ...valueLines]: string[], propertyName: string): string[] | undefined {
  const inlineValue = fieldLine.slice(fieldLine.indexOf(':') + 1).trim();
  if (inlineValue.startsWith('[') && inlineValue.endsWith(']')) {
    return parseInlineArray(inlineValue);
  }

  if (inlineValue) {
    throw new Error(`Property "${propertyName}" is not an array`);
  }

  const values = valueLines
    .map(line => line.trim())
    .filter(line => line.startsWith('-'))
    .map(line => line.slice(1).trim())
    .filter(Boolean);

  return values.length > 0 ? values : undefined;
}

function parseInlineArray(inlineValue: string): string[] {
  const inlineContent = inlineValue.slice(1, -1);
  if (!inlineContent) {
    return [];
  }

  return inlineContent
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);
}
