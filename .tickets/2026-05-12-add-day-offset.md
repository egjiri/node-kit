---
title: Add Day Offset
status: Finished
---

## Description
## Current state

- The time package source lives under `src/time/`.
- `src/time/types.ts` currently contains shared time types/enums and related type guards, including:
  - `export type CalendarDate = ...`
  - `export type DayOfMonth = ...`
  - `export function isDayOfWeek(...)`
  - `export function isMonth(...)`
  - `export function isDayOfMonth(...)`
- `src/time/types.test.ts` tests the existing type guards with Vitest `describe`, `test.each`, and the shared `Cases` type imported as `import type { Cases } from 'testing';`.
- `src/time/index.ts` is the public entrypoint for `@egjiri/node-kit/time`; it re-exports runtime values from `./types.js` and type-only exports with `export type { ... } from './types.js';`.
- `src/time/index.test.ts` imports all public runtime exports from `.` and asserts that each is defined.
- Existing time package export paths in `src/time/index.ts` use `.js` extensions, for example `export { timeAgo } from './time-ago.js';` and `export { DayOfWeek, Frequency, ... } from './types.js';`.

## Goal

- Add a new day-offset string type to `src/time/types.ts`:
  - `export type DayOffset = `${number}d`;`
- Add the requested day-offset validator in the time package:
  - `export const DAY_OFFSET_PATTERN = /^[+-]?\d+d$/;`
  - `export function isDayOffset(value: string): value is DayOffset { return DAY_OFFSET_PATTERN.test(value); }`
- Prefer placing `DAY_OFFSET_PATTERN` and `isDayOffset` in `src/time/types.ts` next to the existing type guards unless implementation context suggests a better file; this matches the current pattern where `types.ts` contains both types and simple validators like `isDayOfMonth`.
- Update `src/time/types.test.ts` with a new `describe('isDayOffset', ...)` block following the existing `Cases<typeof is...>` pattern. Cover at least:
  - valid offsets: `0d`, `1d`, `+1d`, `-1d`, `123d`
  - invalid offsets: empty string, `d`, `1`, `1D`, `1.5d`, `1 d`, `abc`
- Update `src/time/index.ts` so public consumers can import the new API from `@egjiri/node-kit/time`:
  - include `DAY_OFFSET_PATTERN` and `isDayOffset` in the runtime export from `./types.js`
  - add `export type { DayOffset } from './types.js';`
- Update `src/time/index.test.ts` to import `DAY_OFFSET_PATTERN` and `isDayOffset` from `.` and include both in the defined-export assertion array.
- Validate the change with:
  - `pnpm test`
  - optionally `pnpm run lint`

## Benefits

- Provides a reusable, documented way to identify relative day offsets such as `-7d` and `+30d`.
- Keeps day-offset typing and validation consistent across consumers of the time package.
- Preserves the package’s existing public-export and test conventions.

## Learnings
- Added `DayOffset = `${number}d`` and `isDayOffset(value: string): value is DayOffset` in `src/time/types.ts`; the validator uses the requested `/^[+-]?\d+d$/` pattern inline so no regex constant is added to the public API.
- Exported `isDayOffset` and the `DayOffset` type from `src/time/index.ts`; `DAY_OFFSET_PATTERN` is intentionally not exported.
- Added Vitest coverage in `src/time/types.test.ts` for valid signed/unsigned day offsets and invalid malformed strings, and updated `src/time/index.test.ts` to verify the new runtime export.
- Validation passed with `pnpm test`, `pnpm run lint`, and `pnpm run build`.
