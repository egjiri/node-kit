---
title: Clarify date-string validation and daysFromToday typing
status: Finished
---

## Description
## Goal
Clean up ambiguous string-based date helpers while keeping CalendarDate validation as the canonical path.

## Files to inspect/update
- `src/time/is-valid-date-string.ts`
- `src/time/is-valid-date-string.test.ts`
- `src/time/days-from-today.ts`
- `src/time/days-from-today.test.ts`
- `src/time/types.ts`
- `src/time/index.ts`
- `src/time/index.test.ts`

## Current behavior
- `isValidDateString(value: string): boolean` only checks whether a string matches `MM/DD/YYYY` or `YYYY-MM-DD` shape. It does not validate actual calendar validity, e.g. a malformed date like February 29 in a non-leap year can pass the regex check.
- `daysFromToday(dayOffsetOrCalendarDate: string): number | null` accepts any string, then handles DayOffset strings such as `'3d'` or valid CalendarDate strings.

## Desired behavior
- Add `isDateStringFormat(value: string): boolean` for the existing regex-only behavior.
- Make `isValidDateString(value: string): boolean` validate actual date validity, not just shape. It should return true for valid supported date strings and false for invalid dates.
  - Supported shapes remain `MM/DD/YYYY` and `YYYY-MM-DD`.
  - Reuse `normalizeToCalendarDate` / `isValidCalendarDate` rather than duplicating calendar validation logic.
- Update `daysFromToday` typing to make supported inputs clearer, for example `daysFromToday(dayOffsetOrCalendarDate: DayOffset | CalendarDate | string): number | null`.
- Keep `daysFromToday` runtime behavior unchanged: valid day offsets return parsed day counts, valid CalendarDate strings return calendar-day difference from `today()`, and unsupported strings return `null`.
- Export `isDateStringFormat` from `src/time/index.ts` if it is intended as the replacement for regex-only validation.

## Testing
- Add tests for `isDateStringFormat` preserving the old regex semantics.
- Update `isValidDateString` tests to distinguish valid formats from valid dates:
  - valid: `'01/15/2025'`, `'2025-01-15'`.
  - invalid: `'2025-1-15'`, `'2025-02-29'`, `'02/29/2025'`, invalid month/day values.
- Keep existing `daysFromToday` behavior tests passing.
- Run relevant Vitest files or `pnpm test` before finishing.

## Notes
- `CalendarDate` remains the preferred type for date-only values.
- Avoid adding new Date-based behavior in this ticket.

## Learnings
- `isValidDateString` now delegates to `normalizeToCalendarDate`, so supported date strings must also be valid calendar dates while CalendarDate validation remains canonical.
- Avoided adding a new public `isDateStringFormat` export; regex-only parsing remains private to the calendar-date helpers.
- `normalizeToCalendarDate` and `isValidCalendarDate` now share private date-string part parsing while keeping raw string parts separate from validated `CalendarDateParts`.
- `daysFromToday` now advertises `DayOffset | CalendarDate | string` input without changing runtime behavior.
- Verified with focused Vitest coverage, `pnpm run lint`, `pnpm run build`, and `pnpm test`.
