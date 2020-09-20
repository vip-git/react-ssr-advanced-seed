module.exports = {
	globalSetup: '<rootDir>/scripts/config/jest/puppeteer/setup.js',
	globalTeardown: '<rootDir>/scripts/config/jest/puppeteer/teardown.js',
	testEnvironment: '<rootDir>/scripts/config/jest/puppeteer/config.js',
	testMatch: [
		'<rootDir>/src/client/**/__tests__/**/*.e2e-test.{js,jsx,ts,tsx,mjs}',
		'<rootDir>/src/client/**/?(*.)(e2e-test).{js,jsx,ts,tsx,mjs}'
	],
	transform: {
		'^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
		'^.+\\.(ts|tsx|mjs)$': 'ts-jest',
		'^.+\\.css$': '<rootDir>/scripts/config/jest/cssTransform.js',
		'^(?!.*\\.(js|jsx|mjs|css|json)$)':
			'<rootDir>/scripts/config/jest/fileTransform.js'
	}
};
