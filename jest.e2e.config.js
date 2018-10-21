module.exports = {
  globalSetup: '<rootDir>/scripts/config/jest/puppeteer/setup.js',
  globalTeardown: '<rootDir>/scripts/config/jest/puppeteer/teardown.js',
  testEnvironment: '<rootDir>/scripts/config/jest/puppeteer/config.js',
  testMatch: [
    '<rootDir>/src/client/**/__tests__/**/*.e2e-test.{js,jsx,mjs}',
    '<rootDir>/src/client/**/?(*.)(e2e-test).{js,jsx,mjs}',
  ],
};
