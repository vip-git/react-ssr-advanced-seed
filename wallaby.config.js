/* eslint-disable global-require */
/* eslint-disable func-names */
// Setup Env variables
module.exports = function(wallaby) {
	return {
		files: [
			'tsconfig.json',
			'package.json',
			'jest.frontend.config.js',
			'babel.config.js',
			{
				pattern: './scripts/config/**'
			},
			{
				pattern:
					'src/client/**/node_modules/!(@omega-web-components|@omega-shared-components|@omega-core|@omega-state-machines|@omega-web-containers)/**',
				ignore: true
			},
			{
				pattern:
					'src/server/**/node_modules/!(@omega-web-components|@omega-shared-components|@omega-core|@omega-state-machines|@omega-web-containers)/**',
				ignore: true
			},
			{
				pattern: 'src/client/**/node_modules/**',
				instrument: false
			},
			'src/**/*.+(sass|scss|jpg|jpeg|gif|png|svg)',
			{
				pattern: 'src/server/**/*.ts',
				load: false
			},
			{
				pattern: 'src/server/**/*.spec.ts',
				ignore: true
			},
			{
				pattern: 'src/client/**/*.js',
				load: false
			},
			{
				pattern: 'src/client/**/*.ts',
				load: false
			},
			{
				pattern: 'src/client/**/*.tsx',
				load: false
			},
			{
				pattern: 'src/client/**/*.json',
				load: false
			},
			{
				pattern: 'src/client/**/*.test.ts',
				ignore: true
			},
			{
				pattern: 'src/client/**/*.spec.ts',
				ignore: true
			},
			{
				pattern: 'src/client/**/__tests__/*.test.tsx',
				ignore: true
			},
			{
				pattern: 'src/client/**/__tests__/*.spec.tsx',
				ignore: true
			},
			{
				pattern: './scripts/config/webpack.config.js/**',
				ignore: true
			},
			{
				pattern: './scripts/config/jest/puppeteer/**',
				ignore: true
			},
			{
				pattern: './scripts/config/jest/cssTransform.js',
				ignore: true
			},
			{
				pattern: './scripts/config/jest/fileTransform.js',
				ignore: true
			},
			{
				pattern: './scripts/config/env.js',
				ignore: true
			}
		],
		tests: [
			{
				pattern: 'src/server/**/*.spec.ts'
			},
			{
				pattern: 'src/client/**/__tests__/*.spec.ts'
			},
			{
				pattern: 'src/client/**/__tests__/*.spec.tsx'
			},
			{
				pattern: 'src/client/**/__tests__/*.test.ts'
			},
			{
				pattern: 'src/client/**/__tests__/*.test.tsx'
			},
			{
				pattern: 'src/client/**/*.e2e-test.ts'
			},
			{
				pattern: 'src/client/**/*.e2e-test.tsx'
			},
			{
				pattern: 'src/client/**/node_modules/**',
				ignore: true
			},
			{
				pattern: 'src/server/**/node_modules/**',
				ignore: true
			}
		],
		env: {
			type: 'node',
			runner: 'node'
		},
		compilers: {
			'**/*.ts?(x)': wallaby.compilers.typeScript({
				module: 'commonjs',
				jsx: 'React'
			}),
			'src/client/**/*.js?(x)': wallaby.compilers.babel()
		},
		setup(wallabyJS) {
			const jestConfig =
				require('./package').jest || require('./jest.frontend.config');
			jestConfig.transform = {
				'.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
					'jest-transform-stub'
			};
			(jestConfig.moduleNameMapper = {
				'@omega-shared-components/content':
					'<rootDir>/src/client/shared/components/content'
			}),
				wallabyJS.testFramework.configure(jestConfig);
		},
		testFramework: 'jest',
		debug: true
	};
};
