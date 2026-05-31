---
title: Return CalendarDate values from holiday helpers
status: Finished
---

## Description
## Goal
Make holiday date generation CalendarDate-native instead of returning local-midnight Date objects.

## Files to inspect/update
- `src/time/get-holidays.ts`
- `src/time/get-holidays.test.ts`
- `src/time/get-nth-weekday-of-month.ts`
- `src/time/get-nth-weekday-of-month.test.ts`
- `src/time/calendar-date.ts` if a small day-of-week helper is needed
- `src/time/index.ts`
- `src/time/index.test.ts`

## Current behavior
- `getHolidayDates(year: number): Record<Holiday, Date>` returns local Date objects.
- `getNthWeekdayOfMonth(week, dayOfWeek, month, year): Date` returns a local Date and is used by holiday generation.
- Several holidays are constructed with `new Date(...)`, and movable holidays use `addDays(date, n)`.

## Desired behavior
- Change `getHolidayDates(year: number)` to return `Record<Holiday, CalendarDate>`.
- Change `getNthWeekdayOfMonth(week, dayOfWeek, month, year)` to return `CalendarDate`.
- Use CalendarDate helpers such as `createCalendarDate`, overloaded `addDays`, `parseCalendarDate`, and/or `toUtcMidnight` for calculations.
- Remove local-midnight Date construction from holiday calculations where possible.
- Keep `getHolidays()` and `getOntarioHolidays()` behavior unchanged.

## Implementation guidance
- Holidays are civil dates, not instants. Avoid `Date` as part of the public return shape.
- For day-of-week calculations on a `CalendarDate`, use a timezone-stable approach such as converting to UTC midnight and using `getUTCDay()`.
- Fixed-date holidays should be returned as strings like `'2025-01-01'`.
- Movable holidays such as Good Friday and Easter Monday should use overloaded `addDays` with CalendarDate input.
- `getVictoriaDay(year)` can remain a private helper but should return `CalendarDate`.
- `getEasterSunday(year)` can remain private but should return `CalendarDate`.

## Testing
- Update existing holiday tests to expect CalendarDate strings instead of Date objects.
- Keep coverage for 2025 holiday dates and the Victoria Day edge case.
- Update `getNthWeekdayOfMonth` tests to expect CalendarDate strings.
- Run relevant Vitest files or `pnpm test` before finishing.

## Notes
- This is an intentional breaking API change from Date return values to CalendarDate return values.
- Do not add a parallel Date-returning holiday API in this ticket.

## Learnings
- `getHolidayDates` and `getNthWeekdayOfMonth` now return `CalendarDate` strings instead of local-midnight `Date` objects.
- Holiday calculations stay civil-date native by using `createCalendarDate`, CalendarDate `addDays`, and `toUtcMidnight(...).getUTCDay()` for timezone-stable weekday math.
- Existing `getNextBusinessDay` Date behavior is preserved by converting generated holiday CalendarDates back to local Dates with `calendarDateToLocalDate` before `isBusinessDay` checks.
- Tests now assert CalendarDate string outputs, with `getNthWeekdayOfMonth` covered by a table-driven test; relevant Vitest runs, ESM/CJS typechecks, lint, and a 1900-2100 holiday invariant check passed.
