/* eslint-disable eol-last */
const paths = require('./scripts/config/paths');

module.exports = {
	verbose: true,
	collectCoverageFrom: ['src/server/app/**/*.{ts,tsx,mjs}'],
	setupFiles: [
		'<rootDir>/node_modules/regenerator-runtime/runtime',
		'<rootDir>/scripts/config/polyfills.js'
	],
	setupFilesAfterEnv: ['<rootDir>/scripts/config/jest/setup.js'],
	testMatch: [
		'<rootDir>/src/server/app/modules/**/*.spec.{ts,tsx,mjs}',
		'<rootDir>/src/server/app/common/interceptors/**/*.spec.{ts,tsx,mjs}',
		'<rootDir>/src/server/app/common/scalars/**/*.spec.{ts,tsx,mjs}',
		'<rootDir>/src/server/app/common/services/**/?(*.)(spec|test).{ts,tsx,mjs}',
		'<rootDir>/src/server/app/modules/**/?(*.)(spec|test).{ts,tsx,mjs}'
	],
	coverageDirectory: '<rootDir>/backend-coverage',
	coveragePathIgnorePatterns: [
		'<rootDir>/node_modules',
		'<rootDir>/src/server/app/generate-typings.ts',
		'<rootDir>/src/server/app/graphql.schema.ts',
		'<rootDir>/src/server/app/app.module.ts',
		'<rootDir>/src/server/app/modules/chats/chats.module.ts',
	],
	testEnvironment: 'node',
	testURL: 'http://localhost',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.css$': '<rootDir>/scripts/config/jest/cssTransform.js',
		'^(?!.*\\.(js|jsx|mjs|css|json)$)':
			'<rootDir>/scripts/config/jest/fileTransform.js'
	},
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
	moduleDirectories: paths.resolveModules,
	moduleFileExtensions: ['ts', 'json', 'tsx', 'js', 'jsx', 'node', 'mjs']
};