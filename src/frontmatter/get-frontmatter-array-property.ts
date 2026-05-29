import { extractFrontmatter } from './extract-frontmatter.js';

type FrontmatterValue = string | string[];
type FrontmatterProperties = Map<string, FrontmatterValue>;

export function getFrontmatterArrayProperty(content: string, propertyName: string): string[] | undefined {
  const { frontmatterYaml } = extractFrontmatter(content);
  const properties = parseFrontmatterProperties(frontmatterYaml);

  const value = properties.get(propertyName);
  if (value === undefined || Array.isArray(value)) {
    return value;
  }

  throw new Error(`Property "${propertyName}" is not an array`);
}

function parseFrontmatterProperties(frontmatterYaml: string): FrontmatterProperties {
  const properties: FrontmatterProperties = new Map();
  const lines = frontmatterYaml.split('\n');
  let currentProperty: string | null = null;
  let currentArrayValues: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    if (trimmed.includes(':') && !trimmed.startsWith('-')) {
      if (currentProperty && currentArrayValues.length > 0) {
        properties.set(currentProperty, currentArrayValues.slice());
      }
      currentArrayValues = [];

      const colonIndex = trimmed.indexOf(':');
      currentProperty = trimmed.slice(0, colonIndex).trim();
      const inlineValue = trimmed.slice(colonIndex + 1).trim();

      if (inlineValue) {
        const valueIsArray = inlineValue.startsWith('[') && inlineValue.endsWith(']');
        properties.set(currentProperty, valueIsArray ? parseInlineArray(inlineValue) : inlineValue);
        currentProperty = null;
      }
    } else if (currentProperty && trimmed.startsWith('-')) {
      const value = trimmed.slice(1).trim();
      if (value) {
        currentArrayValues.push(value);
      }
    }
  }

  if (currentProperty && currentArrayValues.length > 0) {
    properties.set(currentProperty, currentArrayValues.slice());
  }

  return properties;
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
