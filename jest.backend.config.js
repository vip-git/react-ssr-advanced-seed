const paths = require('./scripts/config/paths');

module.exports = {
    verbose: true,
    collectCoverageFrom: ['src/server/**/*.{ts,tsx,mjs}'],
    setupFiles: [
        '<rootDir>/node_modules/regenerator-runtime/runtime',
        '<rootDir>/scripts/config/polyfills.js',
    ],
    setupTestFrameworkScriptFile: '<rootDir>/scripts/config/jest/setup.js',
    testMatch: [
        '<rootDir>/src/server/modules/**/*.spec.{ts,tsx,mjs}',
        '<rootDir>/src/server/services/**/*.spec.{ts,tsx,mjs}',
        '<rootDir>/src/server/services/**/?(*.)(spec|test).{ts,tsx,mjs}',
        '<rootDir>/src/server/modules/**/?(*.)(spec|test).{ts,tsx,mjs}',
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost/',
    transform: {
        "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
        '^.+\\.css$': '<rootDir>/scripts/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/scripts/config/jest/fileTransform.js'
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
    moduleDirectories: paths.resolveModules,
    moduleFileExtensions: ['ts', 'json', 'tsx', 'js', 'jsx', 'node', 'mjs'],
};
