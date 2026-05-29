const DASHES = '---';
const OPENING_DELIMITER = `${DASHES}\n`;
const CLOSING_DELIMITER = `\n${DASHES}\n`;

export type MarkdownFrontmatterParts = {
  frontmatterBlock: string;
  frontmatterYaml: string;
  markdownBody: string;
};

export function extractFrontmatter(markdownContent: string): MarkdownFrontmatterParts {
  if (!markdownContent.startsWith(OPENING_DELIMITER)) {
    return noFrontmatter(markdownContent);
  }

  const closingIndex = markdownContent.indexOf(CLOSING_DELIMITER, DASHES.length);
  if (closingIndex === -1) {
    return noFrontmatter(markdownContent);
  }

  const contentStartIndex = closingIndex + CLOSING_DELIMITER.length;

  return {
    frontmatterBlock: markdownContent.slice(0, contentStartIndex),
    frontmatterYaml: markdownContent.slice(OPENING_DELIMITER.length, closingIndex),
    markdownBody: markdownContent.slice(contentStartIndex),
  };
}

function noFrontmatter(markdownBody: string): MarkdownFrontmatterParts {
  return { frontmatterBlock: '', frontmatterYaml: '', markdownBody };
}
