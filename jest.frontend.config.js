/* eslint-disable eol-last */
const paths = require('./scripts/config/paths');

module.exports = {
  verbose: true,
  collectCoverageFrom: ['src/client/**/*.{js,jsx,ts,tsx,mjs}'],
  setupFiles: [
    '<rootDir>/node_modules/regenerator-runtime/runtime',
    '<rootDir>/scripts/config/polyfills.js',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/scripts/config/jest/setup.js',
  testMatch: [
    '<rootDir>/src/client/web/**/?(*.)(spec|test).{js,jsx,ts,tsx,mjs}',
    '<rootDir>/src/client/shared/**/?(*.)(spec|test).{js,jsx,ts,tsx,mjs}',
  ],
  coverageDirectory: '<rootDir>/frontend-coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/src/client/mobile/metro.config.js',
    '<rootDir>/src/client/mobile/babel.config.js',
    '<rootDir>/src/client/mobile/__tests__',
    '<rootDir>/src/client/web/ssr',
    '<rootDir>/src/client/web/server.ts',
    '<rootDir>/src/client/web/app/App.e2e-test.ts',
    '<rootDir>/src/client/web/app/common/components/doc-gen',
    '<rootDir>/src/client/shared/utils/doc-gen.engine.ts',
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
    '^.+\\.css$': '<rootDir>/scripts/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/scripts/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx|mjs)$'],
  moduleDirectories: paths.resolveModules,
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'mjs'],
};