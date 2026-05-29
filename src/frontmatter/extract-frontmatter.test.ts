import { extractFrontmatter } from './extract-frontmatter';
import type { Cases } from 'testing';

describe('extractFrontmatter', () => {
  const cases: Cases<typeof extractFrontmatter> = [
    [
      'returns original content as markdownBody when frontmatter is absent',
      ['Title\n\nBody'],
      {
        frontmatterBlock: '',
        frontmatterYaml: '',
        markdownBody: 'Title\n\nBody',
      },
    ],
    [
      'extracts frontmatter with delimiters in frontmatterBlock and only YAML in frontmatterYaml',
      ['---\ntags:\n  - note\n---\nBody'],
      {
        frontmatterBlock: '---\ntags:\n  - note\n---\n',
        frontmatterYaml: 'tags:\n  - note',
        markdownBody: 'Body',
      },
    ],
    [
      'extracts an empty frontmatter block',
      ['---\n---\nBody'],
      {
        frontmatterBlock: '---\n---\n',
        frontmatterYaml: '',
        markdownBody: 'Body',
      },
    ],
    [
      'does not mistake a --- line in the body for frontmatter',
      ['Body\n---\n'],
      {
        frontmatterBlock: '',
        frontmatterYaml: '',
        markdownBody: 'Body\n---\n',
      },
    ],
    [
      'treats missing closing delimiter as no frontmatter',
      ['---\ntitle: Note\nBody'],
      {
        frontmatterBlock: '',
        frontmatterYaml: '',
        markdownBody: '---\ntitle: Note\nBody',
      },
    ],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    expect(extractFrontmatter(...args)).toEqual(expected);
  });
});
