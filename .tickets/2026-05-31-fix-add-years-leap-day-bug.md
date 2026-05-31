---
title: Fix addYears leap-day bug
status: Finished
---

## Description
## Goal
Fix the existing `addYears(date: Date, years: number): Date` leap-day bug without adding any new CalendarDate API.

## Files to inspect/update
- `src/time/add-years.ts`
- `src/time/add-years.test.ts`

## Current behavior
- `addYears(date: Date, years: number): Date` exists in `src/time/add-years.ts`.
- It currently checks `date.getMonth()` together with `date.getUTCDate()` when handling Feb 29.
- That mixes local and UTC components and can break in non-UTC time zones. For example, a local Feb 29 date in a positive-offset timezone can have UTC day 28, causing the Feb 29 adjustment to be skipped.

## Desired behavior
- Keep `addYears(date: Date, years: number): Date` as a Date-only API.
- Fix its Feb 29 logic to use local Date components consistently.
- Use `date.getDate()` instead of `date.getUTCDate()` when detecting Feb 29.
- Do not add `addYearsToCalendarDate` or any other new CalendarDate helper in this ticket.
- Do not update `src/time/calendar-date.ts`, `src/time/index.ts`, or index export tests unless required by incidental cleanup.

## Testing
- Add or adjust unit tests for the Date bug fix.
- Include a timezone-sensitive regression test if feasible. At minimum, ensure local Feb 29 Date input uses `getDate()` semantics.
- Preserve existing behavior:
  - adding positive years.
  - adding zero years returns a new Date instance with the same timestamp.
  - subtracting years.
  - Feb 29 stays Feb 29 when the resulting year is a leap year.
  - Feb 29 shifts to Feb 28 when the resulting year is not a leap year.
- Run the relevant Vitest file or `pnpm test` before finishing.

## Learnings
- `addYears` now uses local date components consistently for Feb 29 detection: `getMonth()` with `getDate()` instead of mixing `getMonth()` and `getUTCDate()`.
- Tests now construct dates with `new Date(year, Month, day)` so the test inputs match the local-date semantics used by `addYears`; `new Date('YYYY-MM-DD')` would parse at UTC midnight and can shift the local calendar day by timezone.
