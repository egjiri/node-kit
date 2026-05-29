import {
  contentIsOnlyFrontmatter,
  extractFrontmatter,
} from '.';

test('exports', () => {
  [
    contentIsOnlyFrontmatter,
    extractFrontmatter,
  ].map(item => expect(item).toBeDefined());
});
