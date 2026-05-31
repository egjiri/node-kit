---
title: Convert recurrence APIs to CalendarDate
status: Finished
---

## Description
## Goal
Make recurrence date generation CalendarDate-native end to end.

## Dependencies
- None.

## Files to inspect/update
- `src/time/get-recurring-dates.ts`
- `src/time/get-recurring-dates.test.ts`
- `src/time/get-weekly-dates.ts`
- `src/time/get-weekly-dates.test.ts`
- `src/time/get-monthly-dates.ts`
- `src/time/get-monthly-dates.test.ts`
- `src/time/get-yearly-dates.ts`
- `src/time/get-yearly-dates.test.ts`
- `src/time/get-last-day-of-year.ts`
- `src/time/get-last-day-of-year.test.ts`
- `src/time/new-date-with-end-of-month-limit.ts`
- `src/time/new-date-with-end-of-month-limit.test.ts`
- `src/time/index.ts`
- `src/time/index.test.ts`

## Current behavior
- `getRecurringDates(..., startDate: Date, endDate = getLastDayOfYear('next-year')): Date[]`
- `getWeeklyDates(dayOfWeek, startDate: Date, endDate: Date): Date[]`
- `getMonthlyDates(dayOfMonth, startDate: Date, endDate: Date): Date[]`
- `getYearlyDates(startDate: Date, endDate: Date): Date[]`
- `getLastDayOfYear(...): Date`
- `newDateWithEndOfMonthLimit(year, month, dayOfMonth): Date`

## Desired behavior
- `getRecurringDates(..., startDate: CalendarDate, endDate = getLastDayOfYear('next-year')): CalendarDate[]`
- `getWeeklyDates(dayOfWeek, startDate: CalendarDate, endDate: CalendarDate): CalendarDate[]`
- `getMonthlyDates(dayOfMonth, startDate: CalendarDate, endDate: CalendarDate): CalendarDate[]`
- `getYearlyDates(startDate: CalendarDate, endDate: CalendarDate): CalendarDate[]`
- `getLastDayOfYear(...): CalendarDate`
- Replace or rename `newDateWithEndOfMonthLimit` with a CalendarDate-returning helper. If keeping the existing filename/function name for test continuity, change its return type to `CalendarDate`; otherwise use a clearer name such as `createCalendarDateWithEndOfMonthLimit` and update imports/tests.
- Do not add Date overloads or Date wrapper APIs in this ticket.

## Implementation guidance
- Recurrence schedules are civil-date schedules, not instants.
- Use string comparison for validated `YYYY-MM-DD` CalendarDate ranges where appropriate; lexicographic order matches date order.
- Use existing helpers such as `parseCalendarDate`, `createCalendarDate`, overloaded `addDays`, overloaded `addYears`, and `getNumberOfDaysInMonth`.
- Weekly recurrence should compute weekday from CalendarDate in a timezone-stable way, for example via `toUtcMidnight(calendarDate).getUTCDay()`.
- Monthly recurrence should preserve current behavior that clamps day-of-month to the end of shorter months, e.g. requested day 31 yields Feb 28/29 or Apr 30 as needed.
- Monthly recurrence must handle year rollover when incrementing beyond December.
- Yearly recurrence should preserve leap-day behavior by using overloaded `addYears` with CalendarDate input.

## Testing
- Update tests to pass and expect CalendarDate strings instead of Date objects.
- Preserve existing scenarios:
  - weekly dates by day-of-week across month boundaries.
  - monthly dates with day 31 and February clamping.
  - yearly Feb 29 recurrence shifting to Feb 28 in non-leap years.
  - `getRecurringDates` for Weekly, Monthly, SemiMonthly, and Yearly.
  - default `endDate` behavior through `getLastDayOfYear('next-year')`.
- Remove tests that assert returned Date objects have midnight time; that requirement is obsolete after returning CalendarDate.
- Run relevant Vitest files or `pnpm test` before finishing.

## Notes
- This is an intentional breaking API change from Date input/output to CalendarDate input/output for recurrence helpers.

## Learnings
- Recurrence helpers now use `CalendarDate` end to end; validated `YYYY-MM-DD` strings can be compared lexicographically for inclusive date ranges.
- Weekly recurrence should reuse `getDayOfWeek` for timezone-stable CalendarDate weekday calculation.
- Monthly recurrence keeps clamp-to-end-of-month behavior with `createCalendarDateWithEndOfMonthLimit`, while `getMonthlyDates` owns month/year rollover.
- Yearly recurrence preserves leap-day behavior by continuing to advance with the CalendarDate overload of `addYears`.
- Tests now assert CalendarDate strings and include monthly year rollover coverage; focused tests, full test suite, build, and lint passed.
