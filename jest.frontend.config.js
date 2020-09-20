const paths = require('./scripts/config/paths');

module.exports = {
	verbose: true,
	collectCoverageFrom: ['src/client/**/*.{js,jsx,ts,tsx,mjs}'],
	setupFiles: [
		'<rootDir>/node_modules/regenerator-runtime/runtime',
		'<rootDir>/scripts/config/polyfills.js'
	],
	snapshotSerializers: ['enzyme-to-json/serializer'],
	setupFilesAfterEnv: ['<rootDir>/scripts/config/jest/setup.js'],
	testMatch: [
		'<rootDir>/src/client/web/**/?(*.)(spec|test).{js,jsx,ts,tsx,mjs}',
		'<rootDir>/src/client/shared/**/?(*.)(spec|test).{js,jsx,ts,tsx,mjs}'
	],
	coverageDirectory: '<rootDir>/frontend-coverage',
	coveragePathIgnorePatterns: [
		// All type definitions to be excluded
		'!*.d.ts',
		// All Ignore files should be covered by E2E Tests to get maximum coverage.
		'<rootDir>/node_modules',
		'<rootDir>/src/client/mobile/metro.config.js',
		'<rootDir>/src/client/mobile/babel.config.js',
		'<rootDir>/src/client/mobile/__tests__',
		'<rootDir>/src/client/web/ssr',
		'<rootDir>/src/client/web/server.ts',
		'<rootDir>/src/client/web/app/__tests__/app.e2e-test.ts',
		'<rootDir>/src/client/web/app/common/components/doc-gen',
		'<rootDir>/src/client/shared/utils/doc-gen.engine.ts',
		// Root State
		'<rootDir>/src/client/shared/state/index.ts',
		'<rootDir>/src/client/shared/state/root.effects.ts',
		'<rootDir>/src/client/shared/state/root.reducer.ts',
		// Root Model
		'<rootDir>/src/client/web/app/common/model/root.model.ts',
		// Routes
		'<rootDir>/src/client/web/app/routes.tsx',
		// Main App
		'<rootDir>/src/client/web/index.tsx',
		// mobile - covered seperately
		'<rootDir>/src/client/mobile',
		'<rootDir>/src/client/shared/components/content/src/index.native.tsx',
		// service workers
		'<rootDir>/src/client/shared/assets/service-worker.js',
		// Apollo client
		'<rootDir>/src/client/shared/utils/apollo-client-ssr.engine.ts',
		'<rootDir>/src/client/shared/utils/apollo-client.engine.ts'
	],
	testEnvironment: 'jsdom',
	testURL: 'http://localhost',
	transform: {
		'^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
		'\\.(ts|tsx)$': 'ts-jest',
		'^.+\\.css$': '<rootDir>/scripts/config/jest/cssTransform.js',
		'^(?!.*\\.(js|jsx|mjs|css|json)$)':
			'<rootDir>/scripts/config/jest/fileTransform.js'
	},
	transformIgnorePatterns: [
		'[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx|mjs)$'
	],
	moduleDirectories: paths.resolveModules,
	moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'mjs']
};
