export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: 'src/.+\\.test\\.ts',
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageReporters: [
    'html',
    'json-summary',
  ],
};
