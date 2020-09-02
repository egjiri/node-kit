module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: [
    'coverage',
    'build',
    'node_modules',
  ],
  rules: {
    'no-multi-spaces': 'error',
    semi: 'error',
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2],
    quotes: ['error', 'single', { avoidEscape: true }],
    'arrow-parens': ['error', 'as-needed'],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always', { objectsInObjects: false, arraysInObjects: false }],
    'quote-props': ['error', 'as-needed'],
    'keyword-spacing': 'error',
    'comma-spacing': ['error', { before: false, after: true }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  globals: {
    module: true,
  },
};
