import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      'coverage/**',
      'dist/**',
      'node_modules/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsparser,
      globals: {
        // Node.js globals
        console: 'readonly',
        // Jest globals for test files
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended?.rules || {},

      // Custom formatting and style rules
      'no-multi-spaces': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single', { avoidEscape: true }],
      'arrow-parens': ['error', 'as-needed'],
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always', { objectsInObjects: false, arraysInObjects: false }],
      'quote-props': ['error', 'as-needed'],
      'keyword-spacing': 'error',
      'comma-spacing': ['error', { before: false, after: true }],
      semi: ['error', 'always'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];
