const paths = require('../../../scripts/config/paths');

module.exports = {
	preset: 'react-native',
	setupFiles: [
		'<rootDir>/../../../node_modules/regenerator-runtime/runtime',
		'<rootDir>/../../../scripts/config/polyfills.js'
	],
	testEnvironment: 'node',
	testURL: 'http://localhost',
	snapshotSerializers: ['enzyme-to-json/serializer'],
	setupTestFrameworkScriptFile:
		'<rootDir>/../../../scripts/config/jest/setup.js',
	coverageDirectory: '<rootDir>/../../../mobile-coverage',
	collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx,mjs}'],
	transform: {
		'^.+\\.(js)$': '<rootDir>/node_modules/babel-jest',
		'\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
		'^(?!.*\\.(js|jsx|mjs|css|json)$)':
			'<rootDir>/../../../scripts/config/jest/fileTransform.js'
	},
	testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
	testPathIgnorePatterns: [
		'\\.snap$',
		'<rootDir>/node_modules/(?!(@omega-web-components|@omega-shared-components|@omega-core|@omega-state-machines|@omega-web-containers)/)',
		'<rootDir>/lib/'
	],
	moduleDirectories: paths.resolveModules,
	moduleNameMapper: {
		'@omega-shared-components/content': '<rootDir>/../shared/components/content'
	},
	moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'mjs'],
	cacheDirectory: '.jest/cache'
};
