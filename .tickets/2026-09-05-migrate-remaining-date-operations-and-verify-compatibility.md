---
title: Migrate remaining date operations and verify compatibility
status: Finished
dependencies:
  - 2026-09-05-migrate-calendar-date-foundations-to-temporal.md
---

## Description
## Goal
Finish the native Temporal migration of existing `src/time` operations where it simplifies code, verify compatibility across the package, and document the major-release changes. This is the third and final ticket after the Node 26 baseline and calendar-date foundation migration.

## Context and guardrails
- Repository: `/Users/endri/src/github.com/egjiri/node-kit`. Inspect the assigned checkout's status and read both prerequisite tickets' finish learnings before starting.
- The owner approved Node `>=26` as the only intended consumer breaking change. Existing function signatures, overloads, exports, enum numbering, accepted strings, return types, formatting, and business rules must remain compatible.
- Consumers must not receive Temporal objects or need Temporal imports. Keep `CalendarDate` strings and Date return values. Do not create wrappers for capabilities that are not already exported, new public Temporal utilities, or a wrapper class.
- Read `README.md` and `.agents/skills/date-overload/SKILL.md`. Follow `src/time/add-days.ts` and `src/time/add-days.test.ts` for the established overloaded public function/private implementation and shared test-case patterns. Apply the ponytail skill and, only if needed, the test-private-code skill.
- No shims, runtime dependencies, older-runtime fallback implementation, downstream repository changes, unrelated bug fixes, or speculative refactoring. Do not stage, commit, tag, bump versions through committing commands, or publish.

## Files to inspect
- Arithmetic and properties: `src/time/add-days.ts`, `src/time/add-years.ts`, `src/time/days-between-calendar-dates.ts`, `src/time/get-number-of-days-in-month.ts`, `src/time/get-number-of-days-in-year.ts`, `src/time/is-leap-year.ts`, `src/time/get-day-of-week.ts`, `src/time/is-weekend.ts`, `src/time/create-calendar-date-with-end-of-month-limit.ts`, and their tests.
- Formatting and related helpers: `src/time/format.ts`, `src/time/is-equal.ts`, `src/time/time-ago.ts`, `src/time/days-from-today.ts`, `src/time/get-last-day-of-year.ts`, and their tests.
- Scheduling/business rules: `src/time/get-recurring-dates.ts`, `src/time/get-weekly-dates.ts`, `src/time/get-monthly-dates.ts`, `src/time/get-yearly-dates.ts`, `src/time/get-nth-weekday-of-month.ts`, `src/time/get-holidays.ts`, `src/time/is-business-day.ts`, `src/time/get-next-business-day.ts`, `src/time/get-interval-from-frequency.ts`, `src/time/calculate-amount-by-frequency.ts`, and their tests.
- Shared foundations and API: `src/time/calendar-date.ts`, `src/time/types.ts`, `src/time/index.ts`, `src/time/index.test.ts`, `README.md`, and `scripts/prepare-release-package.ts`.

## Implementation guidance
- Reuse the migrated calendar-date foundations. Replace calendar-day/year arithmetic and date differences with PlainDate operations where simpler. Consider native `daysInMonth`, `daysInYear`, `inLeapYear`, and `dayOfWeek` rather than Date-constructor or millisecond workarounds.
- Preserve overload dispatch and return types in `addDays`, `addYears`, and `format`. Date inputs retain local-time behavior and time-of-day. A calendar day is not always 24 elapsed hours across DST. Do not convert Date inputs to PlainDate and lose their time, or substitute fixed-duration instant arithmetic for local calendar arithmetic. Retain Date code when that is the simpler compatibility-preserving implementation.
- Preserve addYears leap-day clamping and support for years below 100. Check zero/negative amounts and existing amount validation/coercion behavior before choosing Temporal duration construction. Report any incompatibility rather than silently narrowing an existing contract.
- Keep Month values zero-based and DayOfWeek Sunday-based (`Sunday = 0`). Temporal ISO values are months 1–12 and weekdays Monday=1 through Sunday=7.
- Use explicit rejecting or constraining behavior as appropriate to the existing helper. Preserve strict CalendarDate boundaries and errors from the previous ticket. Temporal objects cannot replace lexicographic string comparisons without explicit comparison methods.
- `format` must preserve its existing `en-us` weekday/month/day/year output, optional timezone behavior for Date inputs, and timezone independence for CalendarDate inputs.
- Preserve clock mocking compatibility in current-year, today, relative-date, and timeAgo paths. Temporal does not replace Intl.RelativeTimeFormat or our relative-time thresholds. Keep simple Date equality and frequency calculations unchanged if Temporal adds no value.
- Temporal does not supply holiday definitions, payment rules, or recurrence generators. Keep that domain logic and simplify only the date mechanics worth changing. Existing helpers may already benefit transitively from the foundation/arithmetic migration without further edits.
- Preserve inclusive range endpoints, empty-range behavior, supported frequencies, defaults, output ordering, and business-day adjustment direction. Monthly requested day 31 must remain Jan 31 → Feb 28/29 → Mar 31, not drift to March 28/29 after repeated constrained additions. Preserve existing yearly leap-day progression rather than introducing a new re-anchoring policy.

## Validation and acceptance
- Update tests in the same ticket as each implementation change. Search every caller of changed shared helpers before editing and validate sibling paths, not just the named entry point.
- Add focused compatibility checks where coverage is missing: leap/month/year boundaries, years below 100, non-midnight Date inputs, input immutability, local wall-clock preservation and elapsed-time differences across DST, strict validation, Date-based fake timers, and recurrence re-anchoring after February.
- Run `pnpm exec vitest run src/time`. Also run the time suite in at least `TZ=UTC` and `TZ=America/Toronto` so timezone-sensitive behavior is exercised. Include explicit DST-transition cases, not only dates far from clock changes.
- Verify `src/time/index.ts` and the emitted ESM/CommonJS declarations retain the public API. Smoke-test both built time entry points and confirm `dist/package.json` still advertises Node `>=26`. No Temporal public types, runtime polyfill imports, or additional wrapper exports may appear.
- Run `pnpm run all` under Node 26. In a headless environment use `pnpm run lint && pnpm run build && pnpm exec vitest run --coverage` to skip only opening the coverage report. All package checks, not just time tests, must pass.
- Add a concise note in `README.md` documenting the major-release runtime requirement and internal Temporal implementation with unchanged consumer APIs. Defer direct consumer Temporal migration, helper deprecation/removal, the actual version bump, tagging, and publishing to separately approved work.
- Finish learnings should summarize migrated versus intentionally retained operations, compatibility evidence and commands, tooling/runtime used, public API verification, and any residual risks or pre-existing semantic conflicts.

## Learnings
- Migrated only the operations where native Temporal clearly reduced code: `daysBetweenCalendarDates` now uses `Temporal.PlainDate.until`, and internal `getDayOfWeek` uses `PlainDate.dayOfWeek % 7` to preserve the package's Sunday-based `DayOfWeek` numbering.
- Intentionally retained Date overloads, addYears clamping, month/year property helpers, formatting, clocks, recurrence, holidays, business rules, equality, and frequency calculations. Temporal would add no value or would risk changing local-time, DST, coercion, range, or domain behavior.
- Owner review favored the minimal native implementations over duplicate `parseCalendarDate` calls. Declared `CalendarDate` APIs remain unchanged, but JavaScript, `any`, or asserted callers may now pass broader Temporal-compatible values, and Temporal supplies runtime errors instead of the package's prior strict error messages.
- Removed the obsolete test that mocked `Date.prototype.getUTCDay`, because the migrated weekday helper no longer has a Date path and native `dayOfWeek` always returns 1 through 7 for a valid PlainDate. Existing weekday and date-difference tests cover the resulting logic.
- Deviated from the requested README implementation note because the owner determined that only the existing Node `>=26` requirement is consumer-relevant. Broad new compatibility tests were also removed to keep this commit focused. Focused DST, clock, formatting, and recurrence coverage can be revisited separately.
- Validated with Node 26.8.1, native Temporal, and pnpm 10.13.1. Time suites passed in UTC and America/Toronto with 288 tests each. Lint, both builds, and the full 459-test coverage run passed at 100%. ESM/CommonJS smoke checks found 38 unchanged exports, declarations remained identical with no Temporal public types, and `dist/package.json` retained `engines.node: ">=26"` with no runtime dependencies.
