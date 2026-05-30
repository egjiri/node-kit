export function findFrontmatterField(frontmatterYaml: string, key: string): {
  frontmatterLines: string[];
  fieldLines?: string[];
} {
  const frontmatterLines = frontmatterYaml ? frontmatterYaml.split('\n') : [];
  const startIndex = frontmatterLines.findIndex(line => getFieldName(line) === key);
  if (startIndex === -1) {
    return { frontmatterLines };
  }

  const nextFieldOffset = frontmatterLines
    .slice(startIndex + 1)
    .findIndex(line => line.trim() !== '' && !/^\s/.test(line));
  const endIndex = nextFieldOffset === -1 ? frontmatterLines.length : startIndex + nextFieldOffset + 1;

  return {
    frontmatterLines,
    fieldLines: frontmatterLines.slice(startIndex, endIndex),
  };
}

function getFieldName(line: string): string | undefined {
  if (/^\s/.test(line) || !line.includes(':')) {
    return;
  }

  return line.slice(0, line.indexOf(':')).trim();
}
