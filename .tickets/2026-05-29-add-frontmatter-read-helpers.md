---
title: Add frontmatter array read helper
status: Finished
dependencies:
  - 2026-05-29-add-frontmatter-package-with-document-splitting-primitives.md
---

## Description
## Goal
Add the minimal read-only frontmatter property helper needed by existing note-processing code: read a simple array property from Markdown frontmatter and throw when that property exists as a scalar.

## Depends on
This ticket depends on the frontmatter extraction primitives from `Add frontmatter package with extraction primitives`.

Implementation decisions from the prerequisite ticket:
- The exported extractor is `extractFrontmatter(content)`, not `splitFrontmatter()`.
- `extractFrontmatter(content)` returns `{ frontmatterBlock, frontmatterYaml, markdownBody }`.
- Frontmatter presence is inferred from `frontmatterBlock !== ''`.
- Empty YAML frontmatter is valid and returns a non-empty `frontmatterBlock` with `frontmatterYaml: ''`.
- Missing closing delimiters are treated as no frontmatter.
- Parsing is LF-only.

## Reference snippets to emulate
Use this property model and array getter behavior:

```ts
type Properties = Map<string, string | string[]>;

getArrayProperty(propertyName: string): string[] | undefined {
  const value = this.properties.get(propertyName);
  if (value) {
    if (!Array.isArray(value)) {
      throw new Error(`Property "${propertyName}" is not an array`);
    }
    return value;
  }
}
```

Use this parsing behavior for simple frontmatter properties. This snippet was written against a full frontmatter block, but the node-kit implementation should parse `frontmatterYaml` from `extractFrontmatter(content)`, so do not slice off delimiter lines in the new implementation:

```ts
const properties: Properties = new Map();
const lines = frontmatter.split("\n").slice(1, -2);
let currentProperty: string | null = null;
const currentArrayValues: string[] = [];

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed) {
    continue;
  }

  // Check if this is a new property (contains :)
  if (trimmed.includes(":") && !trimmed.startsWith("-")) {
    // Save previous property if exists
    if (currentProperty) {
      if (currentArrayValues.length > 0) {
        properties.set(currentProperty, currentArrayValues.slice());
        currentArrayValues.length = 0;
      }
    }

    const colonIndex = trimmed.indexOf(":");
    currentProperty = trimmed.slice(0, colonIndex).trim();
    const afterColon = trimmed.slice(colonIndex + 1).trim();

    if (afterColon) {
      // Inline array format: property: [value1, value2]
      if (afterColon.startsWith("[") && afterColon.endsWith("]")) {
        const inlineContent = afterColon.slice(1, -1);
        const values = inlineContent ? inlineContent.split(",").map((v) => v.trim()).filter((v) => v) : [];
        properties.set(currentProperty, values);
        currentProperty = null;
      } else {
        // Single value
        properties.set(currentProperty, afterColon);
        currentProperty = null;
      }
    }
    // If no value after colon, it's a multi-line property - keep currentProperty set
  } else if (currentProperty && trimmed.startsWith("-")) {
    // Array item for current property
    const value = trimmed.slice(1).trim();
    if (value) {
      currentArrayValues.push(value);
    }
  }
}

// Save last property if exists
if (currentProperty && currentArrayValues.length > 0) {
  properties.set(currentProperty, currentArrayValues);
}
```

Do not add a full YAML parser and do not add quote/comment/escape handling beyond the simple behavior shown above.

## Files to add/update in this repo
- Update `src/frontmatter/index.ts` to export the new public helper.
- Add implementation file(s), for example:
  - `src/frontmatter/get-frontmatter-array-property.ts`
  - `src/frontmatter/parse-frontmatter-properties.ts` as an internal helper if useful
- Add tests, for example:
  - `src/frontmatter/get-frontmatter-array-property.test.ts`
  - Update `src/frontmatter/index.test.ts` so it verifies `getFrontmatterArrayProperty` is exported alongside `extractFrontmatter` and `contentIsOnlyFrontmatter`.

## Public API to add
```ts
export function getFrontmatterArrayProperty(content: string, propertyName: string): string[] | undefined;
```

## Internal helper behavior to implement
The implementation may use an internal parser with this type:

```ts
type FrontmatterValue = string | string[];
type FrontmatterProperties = Map<string, FrontmatterValue>;
```

Keep these types internal unless a current caller needs them.

Behavior details:
- Use `extractFrontmatter(content)` from the prerequisite ticket.
- If `frontmatterBlock === ''`, return `undefined`.
- Use the `frontmatterYaml` returned by `extractFrontmatter(content)` and split it on LF (`\n`) only. Do not parse `frontmatterBlock` and do not remove delimiter lines manually.
- Ignore blank frontmatter lines.
- A property line is any trimmed line containing `:` and not starting with `-`.
- The property name is the trimmed text before the first `:`.
- The inline property value is the trimmed text after the first `:`.
- Scalar values are stored exactly as the trimmed inline value.
- Inline arrays only support simple comma splitting:
  - `tags: [foo, bar]` -> `['foo', 'bar']`
  - Empty entries are filtered out after trimming.
- Block arrays collect following trimmed lines that start with `-` while a current property is open:
  - `tags:\n  - foo\n  - bar` -> `['foo', 'bar']`
- Empty block array values are ignored.
- If a property has no inline value and no block array values, omit it from the map.

## Public helper behavior
- `getFrontmatterArrayProperty(content, propertyName)`:
  - returns the array when the property exists as an inline or block array
  - returns `undefined` when the property is missing or when no frontmatter exists
  - throws `Property "${propertyName}" is not an array` when the property exists as a scalar

## Tests to include
Cover at minimum:
- No frontmatter returns `undefined`.
- Missing property returns `undefined`.
- Inline array:
  ```yaml
  tags: [foo, bar]
  ```
- Empty inline array:
  ```yaml
  tags: []
  ```
- Block array:
  ```yaml
  tags:
    - foo
    - bar
  ```
- Blank lines in frontmatter are ignored.
- Scalar property throws when read as an array:
  ```yaml
  tags: foo
  ```
- Values are not unquoted or otherwise YAML-decoded; they are returned using the simple trimming rules from the reference snippet.

## Validation
Run:
```bash
pnpm run test -- src/frontmatter
pnpm run build
```

## Learnings
Implemented `getFrontmatterArrayProperty(content, propertyName)` in `src/frontmatter/get-frontmatter-array-property.ts` and exported it from `src/frontmatter/index.ts`. The helper uses `extractFrontmatter(content).frontmatterYaml`, parses simple LF-only frontmatter properties into an internal `Map<string, string | string[]>`, returns arrays or `undefined` for missing/no frontmatter, and throws `Property "${propertyName}" is not an array` for scalar values. Tests are table-driven for normal return cases, keep the single scalar error as a normal test, cover inline arrays, empty inline arrays, block arrays, blank lines, no YAML quote/comment decoding, and saving a block array before the next property. Validation run during the ticket included `pnpm run test -- src/frontmatter`, `pnpm run lint`, `pnpm run build`, and focused coverage showing 100% for the new helper.
