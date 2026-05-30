import { addValueToFrontmatterArray } from './add-value-to-frontmatter-array';
import type { Cases } from 'testing';

const cases: Cases<typeof addValueToFrontmatterArray> = [
  [
    'adds a new frontmatter array when frontmatter is absent',
    ['Body', 'tags', 'beta'],
    {
      content: '---\ntags:\n  - beta\n---\nBody',
      valueWasPresent: false,
    },
  ],
  [
    'appends a missing array property to existing frontmatter',
    ['---\ntitle: Note\n---\nBody', 'tags', 'beta'],
    {
      content: '---\ntitle: Note\ntags:\n  - beta\n---\nBody',
      valueWasPresent: false,
    },
  ],
  [
    'adds a value to a block array and sorts values',
    ['---\ntags:\n  - zebra\n  - alpha\ntitle: Note\n---\nBody', 'tags', 'beta'],
    {
      content: '---\ntags:\n  - alpha\n  - beta\n  - zebra\ntitle: Note\n---\nBody',
      valueWasPresent: false,
    },
  ],
  [
    'does not duplicate an existing inline array value',
    ['---\ntags: [zebra, alpha, beta]\n---\nBody', 'tags', 'beta'],
    {
      content: '---\ntags:\n  - alpha\n  - beta\n  - zebra\n---\nBody',
      valueWasPresent: true,
    },
  ],
  [
    'adds a value to an empty inline array',
    ['---\ntags: []\n---\nBody', 'tags', 'beta'],
    {
      content: '---\ntags:\n  - beta\n---\nBody',
      valueWasPresent: false,
    },
  ],
  [
    'adds a value to an empty block array',
    ['---\ntags:\n---\nBody', 'tags', 'beta'],
    {
      content: '---\ntags:\n  - beta\n---\nBody',
      valueWasPresent: false,
    },
  ],
  [
    'preserves comments in existing values',
    ['---\ntags:\n  - beta # comment\n---\nBody', 'tags', 'alpha'],
    {
      content: '---\ntags:\n  - alpha\n  - beta # comment\n---\nBody',
      valueWasPresent: false,
    },
  ],
];

describe('addValueToFrontmatterArray', () => {
  test.each(cases)('%s', (_, args, expected) => {
    expect(addValueToFrontmatterArray(...args)).toEqual(expected);
  });

  test('throws when the property exists as a scalar', () => {
    const actual = () => addValueToFrontmatterArray('---\ntags: beta\n---\nBody', 'tags', 'alpha');
    expect(actual).toThrow('Property "tags" is not an array');
  });
});
