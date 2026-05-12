---
title: Add daysFromToday
status: Finished
dependencies:
  - 2026-05-12-add-day-offset.md
  - 2026-05-12-add-calendar-date-diff.md
---

## Description
## Current state

- The time package source lives under `src/time/` in the `@egjiri/node-kit` repo.
- There is currently no `daysFromToday` function in `src/time/`.
- Existing helpers needed by this work are already present:
  - `src/time/types.ts` exports `type DayOffset = `${number}d`` and `isDayOffset(value: string): value is DayOffset`, where valid offsets look like `0d`, `1d`, `+1d`, or `-1d`.
  - `src/time/types.ts` also exports shared time enums/type guards.
  - `src/time/calendar-date.ts` exports `toCalendarDate(date: Date, timeZone = 'UTC'): CalendarDate` and `isValidCalendarDate(calendarDate: string): calendarDate is CalendarDate`.
  - `src/time/days-between-calendar-dates.ts` exports `daysBetweenCalendarDates(from: CalendarDate, to: CalendarDate): number`.
- `src/time/index.ts` is the public entrypoint for `@egjiri/node-kit/time`; implementation exports use `.js` extensions, for example `export { addDays } from './add-days.js';`.
- Time utilities generally follow a one-function-per-file pattern with matching Vitest files, for example:
  - Implementation: `src/time/add-days.ts`
  - Test: `src/time/add-days.test.ts`
- Tests commonly use the shared `Cases` helper from `src/testing/types.ts`, imported as `import type { Cases } from 'testing';`, as shown in `src/time/add-days.test.ts`, `src/time/calendar-date.test.ts`, and `src/time/days-between-calendar-dates.test.ts`.
- Tests that depend on the current date use Vitest fake timers (`vi.useFakeTimers()` and `vi.setSystemTime(...)`), as shown in `src/time/get-number-of-days-in-year.test.ts` and `src/time/get-recurring-dates.test.ts`.
- `src/time/index.test.ts` imports all public runtime exports from `.` and asserts that each is defined.

## Goal

- Add a new public time package function:
  - `daysFromToday(dayOffsetOrCalendarDate: string): number | null`
- Implement it in a new file, likely `src/time/days-from-today.ts`, following the one-function-per-file pattern used by `src/time/add-days.ts` and `src/time/days-between-calendar-dates.ts`.
- Use the existing helpers and project ESM import style:
  - `import { isValidCalendarDate, toCalendarDate } from './calendar-date.js';`
  - `import { daysBetweenCalendarDates } from './days-between-calendar-dates.js';`
  - `import { isDayOffset } from './types.js';`
- Match this behavior:

  ```ts
  export function daysFromToday(dayOffsetOrCalendarDate: string): number | null {
    if (isDayOffset(dayOffsetOrCalendarDate)) {
      return parseInt(dayOffsetOrCalendarDate, 10);
    }

    if (isValidCalendarDate(dayOffsetOrCalendarDate)) {
      const today = toCalendarDate(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone);
      return daysBetweenCalendarDates(today, dayOffsetOrCalendarDate);
    }

    return null;
  }
  ```

- Export the function from `src/time/index.ts` using the existing public-export pattern:
  - `export { daysFromToday } from './days-from-today.js';`
- Update `src/time/index.test.ts` to import `daysFromToday` from `.` and include it in the defined-export assertion array.
- Add `src/time/days-from-today.test.ts` with Vitest coverage for at least:
  - day offsets: `0d -> 0`, `+3d -> 3`, `-2d -> -2`, and an unsigned positive value such as `5d -> 5`
  - valid calendar dates relative to a mocked today date: same day returns `0`, a future date returns a positive number, and a past date returns a negative number
  - invalid inputs return `null`, including an empty string, malformed day offset such as `1D`, a plain number string such as `1`, a non-date string such as `abc`, and an invalid calendar date such as `2025-02-29`
- Make the calendar-date tests deterministic:
  - Use `vi.useFakeTimers()` / `vi.setSystemTime(...)` following `src/time/get-number-of-days-in-year.test.ts`.
  - Mock or otherwise stabilize `Intl.DateTimeFormat().resolvedOptions().timeZone` to `UTC` so expected calendar-date differences do not vary by developer machine time zone.
- Validate the change with:
  - `pnpm test`
  - optionally `pnpm run lint` and `pnpm run build`

## Benefits

- Provides a single public utility for converting either a relative day-offset string or an absolute calendar date into a signed number of days from today.
- Reuses existing time package primitives (`isDayOffset`, `isValidCalendarDate`, `toCalendarDate`, and `daysBetweenCalendarDates`) instead of duplicating parsing/date math logic.
- Keeps the time package API, export conventions, and test style consistent with the rest of `src/time/`.

## Learnings
- Added public `daysFromToday(dayOffsetOrCalendarDate: string): number | null` in `src/time/days-from-today.ts`, reusing `isDayOffset`, `isValidCalendarDate`, `toCalendarDate`, and `daysBetweenCalendarDates`.
- Exported `daysFromToday` from `src/time/index.ts` and added it to `src/time/index.test.ts` public export assertions.
- Added `src/time/days-from-today.test.ts` coverage for signed/unsigned day offsets, valid calendar dates relative to a mocked today, and invalid inputs returning `null`.
- Calendar-date tests freeze system time and mock `Intl.DateTimeFormat.prototype.resolvedOptions()` to `UTC` so expectations are deterministic across machines/time zones.
- Validation passed with `pnpm test` and `pnpm run lint`.
