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

The library is available as an [npm package](https://www.npmjs.com/package/@egjiri/node-kit). To install the package using your favorite package manager run:

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

## Release

This project uses **automated publishing** through GitHub Actions. Publishing happens automatically when you create and push a version tag.

### How to Release:

1. **Update the version** in `package.json`:
   ```bash
   # For a patch release (1.7.0 → 1.7.1)
   pnpm version patch -m "Upgrade version to %s"

   # For a minor release (1.7.0 → 1.8.0)
   pnpm version minor -m "Upgrade version to %s"

   # For a major release (1.7.0 → 2.0.0)
   pnpm version major -m "Upgrade version to %s"
   ```

2. **Push the tag** to trigger the release workflow:
   ```bash
   git push origin main --tags
   ```

### What happens automatically:
- 🏷️ **GitHub Release** is created with the tag name
- 🏗️ **Package is built** (TypeScript → CommonJS & ESM with type definitions)
- 📦 **Published to NPM** with public access
- ✅ **No manual intervention** required
