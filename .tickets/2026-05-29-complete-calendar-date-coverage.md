---
title: Complete calendar-date coverage
status: Finished
---

## Description
## Current state

- The repository is `@egjiri/node-kit` and the time package source/tests live under `src/time/`.
- `src/time/calendar-date.ts` exports:
  - `toCalendarDate(date: Date, timeZone = 'UTC'): CalendarDate`
  - `isValidCalendarDate(calendarDate: string): calendarDate is CalendarDate`
- Current coverage report at `coverage/time/calendar-date.ts.html` shows `src/time/calendar-date.ts` below 100%:
  - Statements/lines: `33/37` (`89.18%`)
  - Branches: `9/11` (`81.81%`)
  - Functions: `3/3` (`100%`)
- The uncovered code is limited to error branches in `src/time/calendar-date.ts`:
  - `toCalendarDate`: lines around the `if (!isValidCalendarDate(calendarDate)) { throw new Error(`Invalid calendar date: ${calendarDate}`); }` guard.
  - private helper `getCalendarDatePart`: lines around the `if (!value) { throw new Error(`Unable to format calendar date: missing ${type}`); }` guard.
- Existing tests are in `src/time/calendar-date.test.ts`. They use Vitest globals, `describe`, `test.each`, and the shared `Cases` helper imported as `import type { Cases } from 'testing';`.
- A relevant mocking pattern exists in `src/time/days-from-today.test.ts`, which uses `vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions')` plus `vi.restoreAllMocks()` to stabilize `Intl` behavior.

## Goal

- Make the smallest practical test-only change needed to bring `src/time/calendar-date.ts` to 100% coverage.
- Prefer updating `src/time/calendar-date.test.ts` instead of adding production code or new test files.
- Add focused Vitest coverage for the two currently uncovered branches:
  - Mock `Intl.DateTimeFormat.prototype.formatToParts` to return invalid date parts such as `2025-02-30`, then assert `toCalendarDate(new Date(...))` throws `Invalid calendar date: 2025-02-30`.
  - Mock `Intl.DateTimeFormat.prototype.formatToParts` to omit one required part, preferably `day`, then assert `toCalendarDate(new Date(...))` throws `Unable to format calendar date: missing day`.
- Keep the existing `Cases<typeof toCalendarDate>` table for normal formatting cases unchanged unless a small refactor is necessary.
- Restore mocks after the new tests using `mockRestore()` or `vi.restoreAllMocks()` so other tests are isolated.
- Validate with:
  - `pnpm run coverage`
  - optionally `pnpm test` and `pnpm run lint`

## Benefits

- Reaches 100% coverage for `src/time/calendar-date.ts` with minimal, targeted tests.
- Documents defensive behavior for impossible/abnormal `Intl.DateTimeFormat.formatToParts` outputs.
- Avoids production code changes while preserving the current time-package test style and Vitest patterns.

## Learnings
- Added focused Vitest coverage in `src/time/calendar-date.test.ts` by mocking `Intl.DateTimeFormat.prototype.formatToParts` for the otherwise unreachable defensive branches: invalid formatted date (`2025-02-30`) and missing `day` part.
- Restoring mocks with `afterEach(() => vi.restoreAllMocks())` keeps the prototype spy isolated from the existing normal formatting table and later tests.
- `getCalendarDatePart` now guards on the missing part object before returning `part.value`, which preserves the explicit error while letting TypeScript narrow safely.
- Validation passed with `pnpm exec vitest run src/time/calendar-date.test.ts`, `pnpm run coverage` (100%), and `pnpm run lint`.
