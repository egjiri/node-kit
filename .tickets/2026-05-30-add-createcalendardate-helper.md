---
title: Add createCalendarDate helper
status: Finished
---

## Description
Add a public time helper that creates a `CalendarDate` from date parts.

Context:
- Existing calendar date code lives in `src/time/calendar-date.ts`.
- Existing public time exports live in `src/time/index.ts`.
- Existing types live in `src/time/types.ts`:
  - `CalendarDate` is the `YYYY-MM-DD` template literal type.
  - `Month` is currently a zero-based enum (`January = 0`, etc.) because existing code uses it with JavaScript `Date`.
  - `DayOfMonth` is a union from `1` through `31`.
- Do not change the `Month` enum to one-based in this ticket; existing helpers such as `newDateWithEndOfMonthLimit`, `getNthWeekdayOfMonth`, and `getHolidays` rely on JS Date-compatible month indexes.

Implementation:
- In `src/time/calendar-date.ts`, add an exported function near the top with the signature:
  ```ts
  export function createCalendarDate(year: number, month: Month, day: DayOfMonth): CalendarDate
  ```
- Import the `Month` and `DayOfMonth` types from `./types.js` as needed.
- The intended call site is:
  ```ts
  createCalendarDate(2030, Month.May, 31)
  ```
  and it should return `'2030-05-31'`.
- Because the existing `Month` enum is zero-based, format the month component with `month + 1` before padding.
- Format the result as `YYYY-MM-DD`; pad year to 4 digits, month to 2 digits, and day to 2 digits.
- Validate the generated string with existing `isValidCalendarDate(calendarDate)` before returning.
- If validation fails, throw an error. Prefer an error that includes the input parts, e.g. `Invalid calendar date: year=2025, month=1, day=30`, or the generated date string if that matches the existing style better.

Exports:
- Export `createCalendarDate` from `src/time/index.ts` alongside `toCalendarDate` and `isValidCalendarDate`.
- Update `src/time/index.test.ts` so the new helper is covered by the barrel export test.

Tests:
- Add tests in `src/time/calendar-date.test.ts` for `createCalendarDate`:
  - returns `'2030-05-31'` for `createCalendarDate(2030, Month.May, 31)`.
  - zero-pads month/day, e.g. January 1 => `'2030-01-01'`.
  - validates real calendar dates and throws for invalid combinations such as non-leap-year February 29 or April 31.
  - accepts leap-year February 29.
- Use existing `Cases` test style in nearby tests where practical.

Verification:
- Run `pnpm test src/time/calendar-date.test.ts src/time/index.test.ts` if supported, or `pnpm test`.
- Run `pnpm run lint` if time permits.

## Learnings
- `createCalendarDate` lives in `src/time/calendar-date.ts` near existing calendar-date helpers and returns a validated `CalendarDate`.
- `Month` remains JavaScript Date-compatible and zero-based, so calendar-date formatting must use `month + 1` before 2-digit padding.
- `isValidCalendarDate` already validates real calendar constraints through `isDayOfMonth(day, month, year)`, so it can reject invalid combinations like non-leap-year February 29 and April 31.
- The public time barrel in `src/time/index.ts` exports calendar-date helpers together; `src/time/index.test.ts` should include any new public helper in the export smoke test.
- For Vitest `test.each` rows that spread `Parameters<typeof createCalendarDate>`, assign cases to an explicitly typed tuple variable to avoid TypeScript spread errors.
