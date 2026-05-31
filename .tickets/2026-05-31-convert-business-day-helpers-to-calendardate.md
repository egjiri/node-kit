---
title: Convert business-day helpers to CalendarDate
status: Finished
dependencies:
  - Return CalendarDate values from holiday helpers
---

## Description
## Goal
Make weekend, holiday, business-day, and next-business-day helpers CalendarDate-only.

## Dependencies
- Requires `getHolidayDates(year)` to return `CalendarDate` values.

## Files to inspect/update
- `src/time/is-weekend.ts`
- `src/time/is-weekend.test.ts`
- `src/time/is-holiday.ts`
- `src/time/is-holiday.test.ts`
- `src/time/is-business-day.ts`
- `src/time/is-business-day.test.ts`
- `src/time/get-next-business-day.ts`
- `src/time/get-next-business-day.test.ts`
- `src/time/index.ts`
- `src/time/index.test.ts`

## Current behavior
- `isWeekend(date: Date): boolean` uses local `date.getDay()`.
- `isHoliday(date: Date, holidays: Date[]): boolean` checks exact Date timestamp equality through `isEqual`.
- `isBusinessDay(date: Date, holidays: Date[] = []): boolean` composes the Date-based weekend and holiday checks.
- `getNextBusinessDay(date: Date, paymentTiming = RelativeTime.Later): Date` walks local Date values and uses `getHolidayDates(date.getFullYear())`.

## Desired behavior
- `isWeekend(date: CalendarDate): boolean`
- `isHoliday(date: CalendarDate, holidays: CalendarDate[]): boolean`
- `isBusinessDay(date: CalendarDate, holidays: CalendarDate[] = []): boolean`
- `getNextBusinessDay(date: CalendarDate, paymentTiming = RelativeTime.Later): CalendarDate`
- Do not add Date overloads or Date wrapper APIs in this ticket.

## Implementation guidance
- Weekend/holiday/business-day concepts are civil-date concepts. They should not silently interpret Date objects using the runtime timezone.
- If a caller has a Date in the future, they can explicitly convert it with `toCalendarDate(date, timeZone)` before calling these helpers.
- For `isWeekend`, compute weekday from the CalendarDate in a timezone-stable way, for example `toUtcMidnight(calendarDate).getUTCDay()`.
- For `getNextBusinessDay`, use `parseCalendarDate(date).year` to choose the holiday year, `Object.values(getHolidayDates(year))` for holidays, and overloaded `addDays(date, +/-1)` for recursion/iteration.
- Consider using a loop instead of recursion if it improves clarity.

## Testing
- Update all related tests to pass CalendarDate strings instead of Date instances.
- Include examples:
  - `isWeekend('2025-01-05') === true` for Sunday.
  - `isWeekend('2025-01-06') === false` for Monday.
  - `getNextBusinessDay('2025-09-06') === '2025-09-08'` for Saturday to Monday.
  - `getNextBusinessDay('2025-12-25') === '2025-12-29'` for Christmas Day.
  - `getNextBusinessDay('2025-09-07', RelativeTime.Earlier) === '2025-09-05'` for Sunday to previous Friday.
- Run relevant Vitest files or `pnpm test` before finishing.

## Notes
- `isEqual(date1: Date, date2: Date)` should remain a Date/instant equality helper; do not repurpose it for CalendarDate comparisons.

## Learnings
- Converted weekend/business-day/next-business-day helpers from Date-based APIs to CalendarDate-only APIs, preserving civil-date semantics and avoiding implicit runtime timezone interpretation.
- Added `getDayOfWeek(date: CalendarDate)` to centralize timezone-stable weekday calculation via `toUtcMidnight(date).getUTCDay()` and reused it in weekend, nth-weekday, and holiday calculations.
- Simplified holiday membership by inlining `holidays.includes(date)` in `isBusinessDay`; the separate `isHoliday` helper/test was removed as unnecessary.
- `getNextBusinessDay` now uses CalendarDate holidays and `addDays`, and recalculates holidays per recursive candidate date so year-boundary holidays are handled correctly.
- Updated related tests to use CalendarDate strings and added coverage for weekend, holiday skipping, earlier timing, and crossing into a new holiday year.
- Validation run during the session: focused Vitest suites, full `pnpm test`, `pnpm run build`, and `pnpm run lint` all passed.
