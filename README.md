<p align="center">
  <img src="logo.svg" alt="Node Kit Logo">
</p>

<p align="center">
  <a href="https://github.com/egjiri/node-kit/actions/workflows/ci.yml">
    <img src="https://github.com/egjiri/node-kit/actions/workflows/ci.yml/badge.svg" alt="CI Badge">
  </a>
  <img src="https://img.shields.io/badge/node--kit-100%25-brightgreen" alt="Coverage Badge">
</p>

A collection of useful Node.js utility functions that can be used across projects. Written in TypeScript.
- **🚀 Node.js Only (not for DOM/browsers)**
- **📦 Zero Dependencies** - No runtime dependencies

## Installation

Install the package using your favorite package manager:

| Package Manager | Command |
|-----------------|---------|
| npm | `npm install @egjiri/node-kit` |
| pnpm | `pnpm add @egjiri/node-kit` |
| yarn | `yarn add @egjiri/node-kit` |
| bun | `bun add @egjiri/node-kit` |

## Usage Examples
```js
import { formatNumber } from '@egjiri/node-kit/numbers'

formatNumber(1234.56, 'currency');
// => $1,234.56
```

```js
import { removeKeysWithBlankValues } from '@egjiri/node-kit/objects'

removeKeysWithBlankValues({
  first: 'first',
  second: null,
  third: undefined,
  fourth: 4
});
// => { first: 'first', fourth: 4 }
```

## Development
1. Install dependencies: `pnpm install`
1. Run tests in watch mode `pnpm run test` (tests automatically re-run when TypeScript src files change)
1. Run code coverage report and open it in the browser `pnpm run coverage`
1. Start Coding!
