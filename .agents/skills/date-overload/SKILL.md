---
name: date-overload
description: Use when implementing, reviewing, or validating overloads for helpers that accept Date or CalendarDate and return the same type as the input. Triggers on CalendarDate overloads, Date overloads, and overload pattern review.
---

Use this skill to preserve the established Date/CalendarDate overload pattern in this project.

## Reference implementation
Use these files as the source of truth for structure and test style:
- `src/time/add-days.ts`
- `src/time/add-days.test.ts`

## Implementation pattern
- Export only the overloaded public helper, e.g. `addDays`.
- Declare public overloads first:
  - `helper(date: Date, amount: number): Date;`
  - `helper(date: CalendarDate, amount: number): CalendarDate;`
- Use one implementation signature with `Date | CalendarDate` input and `Date | CalendarDate` output.
- Delegate immediately to two private helpers:
  - `helperToDate(date: Date, amount: number): Date`
  - `helperToCalendarDate(calendarDate: CalendarDate, amount: number): CalendarDate`
- Do not export the private helpers from their module or from `src/time/index.ts`.
- Keep the existing Date semantics intact; Date operations should continue using Date/local-date behavior already used by the helper.
- Keep CalendarDate semantics timezone-stable; prefer CalendarDate helpers such as `toUtcMidnight`, `toCalendarDate`, `parseCalendarDate`, and `createCalendarDate` as appropriate.
- Update `src/time/index.ts` and `src/time/index.test.ts` only for the public API shape.
- Avoid changing unrelated helpers in the same task.

## Test pattern
- Put tests for both input types in the public helper test file.
- Import helpers and types from their source files, not the package index; avoid `from '.'` in these tests.
- Use one canonical `CalendarDateCase[]` list with labels, args, and expected values.
- Derive Date cases from the canonical CalendarDate cases with a converter helper so Date and CalendarDate labels stay identical.
- Use nested describes by public input type:
  - `describe('Date input', ...)`
  - `describe('CalendarDate input', ...)`
- Do not name nested describes after private helpers such as `helperToDate` or `helperToCalendarDate`.
- Include positive, zero, negative, month rollover, year rollover, leap-year, non-leap-year, and years-below-100 cases when relevant.

## Validation
Run focused lint, typecheck, and tests for the overloaded helper.
