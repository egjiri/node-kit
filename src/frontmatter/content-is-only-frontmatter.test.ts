import { contentIsOnlyFrontmatter } from './content-is-only-frontmatter';
import type { Cases } from 'testing';

describe('contentIsOnlyFrontmatter', () => {
  const cases: Cases<typeof contentIsOnlyFrontmatter> = [
    ['returns true for frontmatter-only content', ['---\ntitle: Note\n---\n'], true],
    ['returns true for empty frontmatter-only content', ['---\n---\n'], true],
    ['returns false for frontmatter followed by body content', ['---\ntitle: Note\n---\nBody'], false],
    ['returns false for content without frontmatter', ['Body'], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    expect(contentIsOnlyFrontmatter(...args)).toBe(expected);
  });
});
