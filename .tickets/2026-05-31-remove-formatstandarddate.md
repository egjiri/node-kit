---
title: Remove formatStandardDate
status: Finished
---

## Description
## Goal
Remove the unused `formatStandardDate` Date formatter from the public time API.

## Context
- A major version bump is planned, so this breaking API removal is acceptable.
- Do not add a `formatStandardCalendarDate` replacement in this ticket. There is no current use case for standard `MM/DD/YYYY` CalendarDate formatting.
- Keep the two remaining formatting APIs:
  - `formatDate(date: Date, timeZone?: string): string` for formatting Date instants.
  - `formatCalendarDate(calendarDate: CalendarDate): string` for formatting civil dates.

## Files to inspect/update
- `src/time/format-date.ts`
- `src/time/format-date.test.ts`
- `src/time/index.ts`
- `src/time/index.test.ts`
- Any generated type/export expectations if present.

## Current behavior
- `src/time/format-date.ts` exports `formatStandardDate`, an `Intl.DateTimeFormat(...).format` function configured with `timeZone: 'UTC'` and `MM/DD/YYYY` output.
- `src/time/index.ts` re-exports `formatStandardDate`.
- Tests currently import/assert `formatStandardDate`.

## Desired behavior
- Delete `formatStandardDate` from `src/time/format-date.ts`.
- Remove its re-export from `src/time/index.ts`.
- Remove it from `src/time/format-date.test.ts` and `src/time/index.test.ts`.
- Do not add a replacement function.

## Testing
- Run the relevant Vitest files or `pnpm test` before finishing.

## Notes
- This is an intentional breaking change.
- Keep `formatDate` and `formatCalendarDate` unchanged unless tests need import cleanup.

## Learnings
- `formatStandardDate` was removed from `src/time/format-date.ts` and from the public `src/time/index.ts` time export surface.
- Tests were cleaned up to stop importing or asserting `formatStandardDate`, while preserving `formatDate` and `formatCalendarDate` coverage.
- Validation passed with focused time tests, `pnpm run build`, and `pnpm run lint`.
