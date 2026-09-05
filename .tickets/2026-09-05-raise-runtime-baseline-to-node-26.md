---
title: Raise runtime baseline to Node 26
status: Finished
---

## Description
## Goal
Prepare `@egjiri/node-kit` for native Temporal by requiring Node `>=26`, updating only necessary tooling, and proving the existing date implementation still passes. This is the first of three sequential tickets. Do not migrate date functions in this ticket.

## Context and decisions
- Repository: `/Users/endri/src/github.com/egjiri/node-kit`. Work in the assigned checkout and inspect its current status before changing files.
- Native Temporal is enabled by default starting in Node 26. Node 22.17.1, currently pinned here, does not expose Temporal by default. Reference: https://nodejs.org/en/blog/release/v26.0.0.
- The owner approved dropping older Node versions. This requires a major release, but existing consumer application APIs must remain unchanged throughout the migration.
- Preserve the README's Node-only, zero-runtime-dependencies policy. Do not add a shim, polyfill, feature-detected fallback, or new public wrapper API.
- Read `README.md` for setup and commands. Apply the ponytail skill. Do not stage, commit, tag, publish, or alter global tool defaults without explicit approval.

## Files to inspect and update
- `package.json`: currently has `engines.node` and `volta.node` set to `22.17.1`, `engines.pnpm` set to `10.13.1`, TypeScript `5.9.2`, and `@types/node` `^22.18.1`.
- `pnpm-lock.yaml` for necessary dependency changes.
- `.github/workflows/ci.yml` and `.github/workflows/release.yml`: both pin Node `22.17.1` and pnpm `10.13.1`.
- `tsconfig.base.json`, `tsconfig.json`, and `tsconfig.cjs.json`: both builds inherit the `ES2022` library configuration.
- `scripts/prepare-release-package.ts`: currently removes the entire `engines` field when preparing `dist/package.json`.
- `README.md` for the minimum Node requirement and development setup.

## Implementation
- Set the supported Node range to `>=26`. Choose and record a concrete supported Node 26.x version for Volta and the workflows. Actually run validation under Node 26, not the old shell runtime.
- Update TypeScript, Node declarations, and compiler library configuration only as necessary to typecheck native Temporal in both ESM and CommonJS builds. Determine which released tooling provides declarations rather than assuming a newer target supplies them. A development-only declaration dependency is acceptable if necessary, but it must not load a runtime polyfill or leak into the existing consumer API.
- Update pnpm or other tooling only if required for Node 26 compatibility. Keep local and CI configurations consistent and regenerate the lockfile through pnpm if dependencies change.
- Ensure the built package advertises `engines.node: >=26`. Preserve that runtime requirement during release preparation without unnecessarily imposing development-only pnpm requirements on consumers.
- Keep date implementation and public exports unchanged. Do not perform unrelated dependency or workflow modernization.
- Document the new runtime requirement in `README.md`. Record that the eventual release must be major, but do not run version commands, create commits/tags, or publish.

## Validation and acceptance
- Confirm the selected runtime with `node -p 'process.version'` and `node -p 'typeof Temporal'`. Temporal must work without flags, imports, or shims.
- Verify a representative `Temporal.PlainDate.from('2026-01-31').add({ months: 1 })` expression both executes natively and typechecks with the selected declaration setup. Keep any probe out of public exports and release artifacts.
- Run `pnpm run all` from `README.md`. For a headless environment, run `pnpm run lint && pnpm run build && pnpm exec vitest run --coverage` instead, which omits only opening the coverage report.
- Inspect `dist/package.json` after building and verify the Node engine requirement survives release preparation. Smoke-check both ESM and CommonJS entry points, for example importing/requiring `./dist/esm/time/index.js` and `./dist/cjs/time/index.js`.
- Existing tests must pass without changing date semantics. Diagnose any baseline failures and report them rather than weakening tests to make the tooling upgrade pass.
- Finish learnings should record exact runtime/tool versions, the Temporal declaration source, commands run, and any compatibility blockers for the next ticket.

## Learnings
- Consumers now require Node `>=26`. Volta and both workflows pin `26.8.1`, the latest Node 26 release checked. pnpm remains `10.13.1`, and global tool defaults were not changed.
- Updated TypeScript to `6.0.3`, `@types/node` to `26.4.1`, and the TypeScript ESLint parser/plugin to `8.58.2` for TypeScript 6 compatibility. Retained ESLint `9.35.0`, Vitest/coverage `3.2.4`, tsx `4.20.5`, and ts-node `10.9.2`. pnpm regenerated the lockfile, and `pnpm install --frozen-lockfile` passed.
- Temporal declarations come from TypeScript's `lib.esnext.temporal.d.ts`, enabled through `ESNext.Temporal` alongside `ES2022`. TypeScript 6.0.3 has no `ES2026` library. Both builds inherit this configuration, without a declaration dependency, runtime polyfill, or public API changes.
- Kept the `ES2022` output target. Explicit `rootDir: "src"` preserves existing entry-point paths under TypeScript 6. `ignoreDeprecations: "6.0"` temporarily retains `baseUrl` and legacy CommonJS Node resolution. Migrate those settings before TypeScript 7.
- Release preparation now preserves only `engines.node: ">=26"`, omitting the development-only pnpm requirement. ESM/CommonJS time-entry smoke checks passed, and emitted declarations were identical to the baseline. Date implementation and exports remain unchanged.
- Verified `node -p 'process.version'` returned `v26.8.1`, `node -p 'typeof Temporal'` returned `object`, and the native January 31 plus one month expression returned `2026-02-28`. The representative expression also typechecked in both builds. On owner review, removed the standalone `src/runtime.test.ts` because this was a tooling probe rather than a library implementation test. No probe remains in source or release artifacts.
- Final validation ran `volta run --node 26.8.1 npm exec --yes --package=pnpm@10.13.1 -- sh -c 'node -p "process.version" && node -p "typeof Temporal" && pnpm --version && pnpm run lint && pnpm run build && pnpm exec vitest run --coverage'`. All 452 existing tests across 70 files passed, with 100% statement coverage. No baseline failures or blockers for the next ticket were found. Existing tsx emits a non-blocking `DEP0205` warning about `module.register()`.
- Owner review kept README changes focused on the runtime requirement, removing Temporal/compiler explanations, duplicated development versions, and headless-validation instructions. Replaced the bespoke workaround comment label with a generic TODO.
- The major release is still pending. `package.json` remains `4.2.2`, and the temporary README major-release note remains in the working tree. The owner proposed releasing `5.0.0`, but no version bump, commit, tag, push, or publication was performed. Confirm release scope and remove the temporary note when handling that follow-up.
