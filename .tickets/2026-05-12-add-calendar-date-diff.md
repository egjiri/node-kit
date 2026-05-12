---
title: Add calendar date diff
status: In Progress
---

## Description
## Current state

- The time package is under `src/time/`.
- `src/time/calendar-date.ts` defines:
  - `export type CalendarDate = \`${number}${number}${number}${number}-${number}${number}-${number}${number}\`;`
  - `toCalendarDate(date: Date, timeZone = 'UTC'): CalendarDate`
  - `isValidCalendarDate(calendarDate: string): calendarDate is CalendarDate`
- `src/time/index.ts` re-exports public time utilities, using `.js` extensions in export paths (for example: `export { isValidCalendarDate, toCalendarDate } from './calendar-date.js';`).
- Time utilities generally use one implementation file and one test file in `src/time/` (for example, `src/time/add-days.ts` and `src/time/add-days.test.ts`). Tests use Vitest and the shared `Cases` helper from `src/testing/types.ts` (imported as `import type { Cases } from 'testing';`), as shown in `src/time/add-days.test.ts` and `src/time/calendar-date.test.ts`.
- `src/time/index.test.ts` verifies that all public exports from `src/time/index.ts` are defined.

## Goal

- Add a new public time package function with this signature:
  - `daysBetweenCalendarDates(from: CalendarDate, to: CalendarDate): number`
- Implement it in a new file, likely `src/time/days-between-calendar-dates.ts`, following the one-function-per-file pattern used by `src/time/add-days.ts`.
- Import the `CalendarDate` type from `src/time/calendar-date.ts` with the project’s ESM path style, for example:
  - `import type { CalendarDate } from './calendar-date.js';`
- Return the signed whole-day difference from `from` to `to`:
  - same date returns `0`
  - later `to` dates return positive numbers
  - earlier `to` dates return negative numbers
- Treat inputs as calendar-only dates, not local-time timestamps. Prefer parsing `YYYY-MM-DD` components and comparing UTC midnight values with `Date.UTC(year, monthIndex, day)` so results are stable across local time zones and DST transitions.
- Add tests in `src/time/days-between-calendar-dates.test.ts` covering at least:
  - same date (`0`)
  - next/previous day (`1` and `-1`)
  - month boundary
  - year boundary
  - leap-year February 29 behavior
- Export the function from `src/time/index.ts` using the same pattern as other exports:
  - `export { daysBetweenCalendarDates } from './days-between-calendar-dates.js';`
- Update `src/time/index.test.ts` to import `daysBetweenCalendarDates` from `.` and include it in the defined-export assertions.
- Validate with:
  - `pnpm test`
  - optionally `pnpm run lint`

## Benefits

- Provides a reusable calendar-date difference helper for consumers of `@egjiri/node-kit/time`.
- Avoids common off-by-one errors caused by local time zones, daylight saving changes, or timestamp-based date math.
- Keeps the time package API consistent with the existing `CalendarDate` type and export/test conventions.
