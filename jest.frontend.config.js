const paths = require('./scripts/config/paths');

module.exports = {
    verbose: true,
    collectCoverageFrom: ['src/client/**/*.{js,jsx,mjs}'],
    setupFiles: [
        '<rootDir>/node_modules/regenerator-runtime/runtime',
        '<rootDir>/scripts/config/polyfills.js',
    ],
    setupTestFrameworkScriptFile: '<rootDir>/scripts/config/jest/setup.js',
    testMatch: [
        '<rootDir>/src/client/**/__tests__/**/*.{js,jsx,mjs}',
        '<rootDir>/src/client/**/?(*.)(spec|test).{js,jsx,mjs}',
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.css$': '<rootDir>/scripts/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/scripts/config/jest/fileTransform.js',
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
    moduleDirectories: ['node_modules'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'mjs'],
};
