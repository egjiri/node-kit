---
title: Add frontmatter package with extraction primitives
status: Finished
---

## Description
## Goal
Add a new `@egjiri/node-kit/frontmatter` export with the minimal Markdown frontmatter document primitives needed by existing note-processing code.

## Reference snippet to emulate
Use this behavior as the source of truth for extracting Markdown frontmatter and the remaining Markdown body:

```ts
const dashes = "---";
const openingDelimiter = dashes + "\n"; // "---\n"
const closingDelimiter = "\n" + dashes + "\n"; // "\n---\n"

if (!markdownContent.startsWith(openingDelimiter)) {
  return;
}

const closingIndex = markdownContent.indexOf(closingDelimiter, dashes.length);
if (closingIndex === -1) {
  return;
}

const contentStartIndex = closingIndex + closingDelimiter.length;

return [
  markdownContent.slice(0, contentStartIndex),
  markdownContent.slice(contentStartIndex),
];
```

Also preserve this behavior for frontmatter-only checks:

```ts
contentAfterFrontmatter.trim() === "";
```

Assume LF (`\n`) line endings only. Do not add CRLF (`\r\n`) support or line-ending detection.

## Files to add/update in this repo
- Add `src/frontmatter/index.ts`
- Add implementation file(s) under `src/frontmatter/`, for example:
  - `src/frontmatter/extract-frontmatter.ts`
  - `src/frontmatter/content-is-only-frontmatter.ts`
- Add tests under `src/frontmatter/`, for example:
  - `src/frontmatter/extract-frontmatter.test.ts`
  - `src/frontmatter/content-is-only-frontmatter.test.ts`
  - `src/frontmatter/index.test.ts`
- Update root `package.json` `exports` with `./frontmatter`, following the existing subpackage pattern for `./strings`, `./objects`, etc.

## Public API to add
```ts
export type MarkdownFrontmatterParts = {
  frontmatterBlock: string; // full block including opening and closing --- delimiters, or '' when absent; use this to infer presence
  frontmatterYaml: string;  // content between delimiters, or '' when absent
  markdownBody: string;     // markdown after frontmatter, or original content when absent
};

export function extractFrontmatter(content: string): MarkdownFrontmatterParts;
export function contentIsOnlyFrontmatter(content: string): boolean;
```

## Behavioral requirements
- All parsing assumes LF (`\n`) line endings.
- Frontmatter presence is inferred from `frontmatterBlock !== ''`; empty YAML frontmatter is valid and should still return a non-empty `frontmatterBlock`.
- `extractFrontmatter(content)` only recognizes frontmatter at the very start of the document where the first characters are exactly `---\n`.
- The closing delimiter is the first occurrence of `\n---\n` after the opening delimiter.
- When frontmatter is present, return:
  - `frontmatterBlock`: the exact frontmatter block including both delimiter lines and the trailing LF after the closing delimiter.
  - `frontmatterYaml`: only the text between delimiters, without the delimiter lines. Preserve internal LF newlines; do not parse YAML in this ticket.
  - `markdownBody`: content after the closing delimiter's LF.
- When frontmatter is absent, return:
  - `frontmatterBlock: ''`
  - `frontmatterYaml: ''`
  - `markdownBody: content`
- If the content starts with `---\n` but no closing delimiter exists, treat it as content with no frontmatter: `frontmatterBlock: ''`, `frontmatterYaml: ''`, `markdownBody: content`.
- `contentIsOnlyFrontmatter(content)` should use `extractFrontmatter(content)` and return `true` only when `frontmatterBlock !== ''` and `markdownBody.trim() === ''`.

## Tests to include
Cover at minimum:
- No frontmatter returns original content as `markdownBody` with `frontmatterBlock: ''`.
- LF frontmatter extraction:
  ```md
  ---
  tags:
    - note
  ---
  Body
  ```
- The returned `frontmatterBlock` includes both delimiters and the trailing LF after the closing delimiter.
- The returned `frontmatterYaml` excludes both delimiter lines.
- Empty frontmatter (`---\n---\nBody`) returns a non-empty `frontmatterBlock`, empty `frontmatterYaml`, and the remaining `markdownBody`.
- Frontmatter-only content returns `contentIsOnlyFrontmatter(content) === true`.
- Content with frontmatter plus non-empty `markdownBody` returns `contentIsOnlyFrontmatter(content) === false`.
- Content without frontmatter returns `contentIsOnlyFrontmatter(content) === false`.
- Markdown body content ending with a horizontal rule `---` must not be mistaken for frontmatter unless the document starts with `---\n`.
- Missing closing delimiter is treated as no frontmatter.
- `src/frontmatter/index.test.ts` verifies the public exports are available.

## Validation
Run:
```bash
pnpm run test -- src/frontmatter
pnpm run build
```

## Learnings
Implemented a new `@egjiri/node-kit/frontmatter` subpackage export with `extractFrontmatter()`, `contentIsOnlyFrontmatter()`, and the `MarkdownFrontmatterParts` type. The final API uses `frontmatterBlock`, `frontmatterYaml`, and `markdownBody`; frontmatter presence is inferred from `frontmatterBlock !== ''` rather than a separate boolean, which keeps empty YAML frontmatter distinguishable from no frontmatter.

Parsing intentionally matches the referenced LF-only behavior: documents must start with `---\n`, the closing delimiter is the first `\n---\n`, and missing closing delimiters are treated as no frontmatter. `contentIsOnlyFrontmatter()` delegates to `extractFrontmatter()` and returns true only when a frontmatter block exists and `markdownBody.trim() === ''`.

Tests were added under `src/frontmatter/` using table-driven `Cases` where appropriate, including no-frontmatter, valid extraction, empty frontmatter, body `---` lines, missing closing delimiter, content-only checks, and index exports. Validation passed with `pnpm run test -- src/frontmatter`, `pnpm run build`, and `pnpm run lint`; targeted frontmatter coverage was also checked at 100%.
