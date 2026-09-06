---
title: Migrate calendar-date foundations to Temporal
status: Finished
dependencies:
  - 2026-09-05-raise-runtime-baseline-to-node-26.md
---

## Description
## Goal
Replace calendar-date plumbing with native Temporal while preserving all existing consumer-facing signatures and behavior. This is the second of three sequential tickets, after the Node 26/tooling baseline. Consumers must not need to adopt Temporal or change application code.

## Context and guardrails
- Repository: `/Users/endri/src/github.com/egjiri/node-kit`. Inspect the assigned checkout's status and read the prerequisite ticket's finish learnings before starting.
- Read `README.md`, `src/time/index.ts`, and the relevant implementation and tests. Apply the ponytail skill. Use the test-private-code skill only if tests actually need otherwise-private helpers, and prefer testing existing public entry points.
- Node 26 and native Temporal declarations should already be available from the prerequisite. No runtime dependencies, shims, polyfills, dual implementations for older runtimes, or custom Temporal wrapper classes.
- Only existing exported helpers may expose behavior. Do not add public Temporal utilities, overloads, or re-exports. Private helpers should exist only when necessary for the current implementation.
- Keep `CalendarDate` as the existing string type, not a `Temporal.PlainDate` alias. Keep Temporal out of existing public signatures and return values.
- Do not stage, commit, tag, publish, or change downstream repositories.

## Files and scope
- Primary implementation: `src/time/calendar-date.ts`.
- Primary tests: `src/time/calendar-date.test.ts`.
- Inspect `src/time/types.ts`, `src/time/is-valid-date-string.ts`, `src/time/is-valid-date-string.test.ts`, `src/time/days-from-today.ts`, and `src/time/days-from-today.test.ts` for validation and clock contracts.
- Inspect `src/time/get-number-of-days-in-month.ts` and related callers to understand the current validation chain. Its general Temporal migration belongs to the next ticket unless a minimal change is necessary here.
- Check `src/time/index.ts` and `src/time/index.test.ts` for export stability. Search all callers of changed helpers, including internal consumers of `toUtcMidnight`.
- Arithmetic, general calendar properties, formatting, recurrence, and business-date simplification belong to the third ticket unless needed to keep this foundation working.

## Required behavior
- Migrate `createCalendarDate`, `createCalendarDateFromDateString`, `parseCalendarDate`, `isValidCalendarDate`, `toCalendarDate`, `calendarDateToLocalDate`, `toUtcMidnight`, and `today` where Temporal actually simplifies their implementation. Reuse Temporal calendar validation and instant/timezone conversion instead of recreating them.
- Preserve exact `YYYY-MM-DD` boundary validation and the four-digit year contract. Temporal accepts more ISO forms and calendar annotations than this package does, so replacing validation with `PlainDate.from` alone is insufficient. Preserve support for zero-padded years below 100.
- Preserve `createCalendarDateFromDateString` support for exactly `MM/DD/YYYY` and `YYYY-MM-DD`. Preserve boolean/type-guard behavior and established validation error messages for invalid inputs.
- Preserve zero-based `Month` and `CalendarDateParts.month` values. Temporal ISO months are one-based, so convert at the existing boundary.
- Temporal object-bag construction defaults to constraining invalid fields. Use rejecting behavior where the existing API rejects invalid calendar dates, and retain necessary shape/range validation.
- Preserve default and explicit timezone behavior in `today` and `toCalendarDate`, including midnight boundaries and invalid Date/timezone handling. Calendar-only operations must remain timezone-stable.
- Keep current-time acquisition compatible with mocked `Date` clocks. Use `Date.now()` or `new Date()` as the clock source before Temporal conversion rather than silently switching existing APIs to `Temporal.Now`. Existing `today` tests also mock `Intl.DateTimeFormat().resolvedOptions().timeZone`, so preserve the established default timezone contract.
- Keep `calendarDateToLocalDate` and internal `toUtcMidnight` returning Date objects with their current local/UTC semantics. Do not replace a simple, correct Date operation with a longer conversion chain merely to use Temporal.

## Tests and acceptance
- Update tests alongside the implementation. Cover strict formats, invalid fields, leap/non-leap February, years below 100, existing error messages, UTC/local conversion, explicit timezone boundaries, and Date-based fake timers.
- Tests in `calendar-date.test.ts` that mock internal `Intl.formatToParts` failures may become obsolete when that implementation is removed. Replace implementation-specific assertions with meaningful boundary tests rather than keeping the old machinery solely to satisfy mocks. Do not weaken public-contract checks.
- Run focused tests with `pnpm exec vitest run src/time/calendar-date.test.ts src/time/is-valid-date-string.test.ts src/time/days-from-today.test.ts`, then all time tests with `pnpm exec vitest run src/time`.
- Run `pnpm run lint` and `pnpm run build` under the Node 26 runtime established in the prerequisite. Inspect emitted declarations to ensure the existing API has not gained Temporal types or new exports.
- Record changed helpers, commands and results, any intentionally retained Date implementation, and any discovered pre-existing defects in finish learnings. Report semantic conflicts rather than silently broadening the migration into unrelated fixes.

## Learnings
- Calendar-date validation and parsing now keep the package's strict four-digit `YYYY-MM-DD` boundary, then use `Temporal.PlainDate.from(..., { overflow: 'reject' })` for calendar correctness. `MM/DD/YYYY` conversion, zero-based public months, type-guard behavior, and established invalid-input messages remain unchanged.
- `toCalendarDate` now converts the supplied `Date` epoch through `Temporal.Instant` and the requested timezone. It retains `Intl.DateTimeFormat().resolvedOptions().timeZone` as the default timezone contract, keeps `Date` as `today`'s mockable clock source, and explicitly preserves the existing `Invalid time value` error for invalid dates.
- `calendarDateToLocalDate` and internal `toUtcMidnight` intentionally remain simple `Date` constructions because they must return `Date`. Passing month and day to `setFullYear`/`setUTCFullYear` fixes a discovered legacy year-zero normalization defect, so the ISO-valid `0000-02-29` is now accepted and round-trips correctly instead of being treated like 1900-02-29.
- Removed implementation-specific `Intl.formatToParts` failure tests. Added public boundary coverage for Temporal annotations, timezone midnight transitions, invalid timezones, years below 100, and year-zero leap-day local/UTC conversion.
- No exports, dependencies, or downstream repositories changed. Emitted time declarations are unchanged and contain no Temporal types. General arithmetic and remaining Date-backed calendar helpers stay scoped to the next migration ticket.
- Under Node 26.8.1 and pnpm 10.13.1, focused tests passed (61), all time tests passed (289), the full suite passed (460), lint and both builds passed, ESM/CommonJS smoke checks passed, and `git diff --check` passed. The build retained the known non-blocking tsx `DEP0205` warning.
