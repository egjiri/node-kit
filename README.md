<p align="center">
  <img src="assets/images/node-kit-logo.svg" alt="Node Kit Logo">
</p>

<p align="center">
  <a href="https://github.com/egjiri/node-kit/actions?query=workflow%3ACI+branch%3Amaster">
    <img src="https://github.com/egjiri/node-kit/workflows/CI/badge.svg?branch=master" alt="CI Badge">
  </a>
  <a href="https://badges.zoostage.com/egjiri/node-kit/master.svg">
    <img src="https://badges.zoostage.com/egjiri/node-kit/master.svg" alt="Coverage Badge">
  </a>
</p>

A collection of useful Node utility functions that can be used across projects. Written in TypeScript.

## Installation
Install through npm:
```
npm install @egjiri/node-kit
```

Install through yarn:
```
yarn add @egjiri/node-kit
```

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
1. Install dependencies: `yarn`
1. Run tests `yarn test` (tests automatically re-run when TypeScript src files change)
1. Start Coding!

## Release

This project is released through GitHub Actions workflows that:
1. Run the test suite and linters
1. Build the TypeScript codebase into a build folder with JavaScript and TypeScript type definition files.
1. Publish the build folder to the NPM Registry.
