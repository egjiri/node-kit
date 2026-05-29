import { extractFrontmatter } from './extract-frontmatter.js';

export function contentIsOnlyFrontmatter(content: string): boolean {
  const { frontmatterBlock, markdownBody } = extractFrontmatter(content);
  return frontmatterBlock !== '' && markdownBody.trim() === '';
}
