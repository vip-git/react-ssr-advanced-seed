module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
		'airbnb',
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'prettier',
		'prettier/@typescript-eslint'
	],
	settings: {
		react: {
			version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
		}
	},
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
			legacyDecorators: true
		},
		project: './tsconfig.json'
	},
	rules: {
		'@typescript-eslint/no-var-requires': 'off',
		'global-require': 'off',
		'no-trailing-spaces': 'off',
		'import/prefer-default-export': 'off',
		'react/jsx-indent': 'off',
		'no-unused-vars': 'off',
		'react/jsx-indent-props': 'off',
		'react/jsx-filename-extension': 'off',
		'react/button-has-type': 'off',
		'react/prop-types': 'off',
		'react/jsx-curly-brace-presence': 'off',
		'react/prefer-stateless-function': 'off',
		'jsx-a11y/anchor-is-valid': [
			'error',
			{
				components: ['Link'],
				specialLink: ['to']
			}
		],
		quotes: [
			2,
			'single',
			{
				avoidEscape: true
			}
		],
		'class-methods-use-this': 'off',
		'function-paren-newline': 'off',
		'jsx-quotes': ['error', 'prefer-single'],
		'quote-props': ['error', 'consistent'],
		'max-len': [
			'warn',
			{
				code: 120
			}
		],
		'brace-style': ['error', 'stroustrup'],
		'no-plusplus': 'off',
		'object-curly-newline': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off'
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				paths: ['src', 'src/client/web']
			}
		}
	},
	env: {
		jest: true
	}
};
