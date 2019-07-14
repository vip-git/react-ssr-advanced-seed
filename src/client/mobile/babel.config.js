/* ignore coverage */
module.exports = {
	presets: [
		'module:metro-react-native-babel-preset',
		'module:react-native-dotenv'
	],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: ['.js', '.ts', '.tsx', '.ios.js', '.android.js']
			}
		],
		'@babel/plugin-transform-runtime',
		'@babel/plugin-syntax-dynamic-import',
		[
			'babel-plugin-inline-import',
			{
				extensions: ['.svg']
			}
		]
	],
	env: {
		test: {
			plugins: [
				'@babel/plugin-transform-modules-commonjs',
				'@babel/plugin-proposal-object-rest-spread',
				'@babel/plugin-proposal-class-properties',
				'@babel/plugin-proposal-optional-chaining',
				'@babel/plugin-syntax-dynamic-import'
			]
		},
		production: {
			plugins: ['react-native-paper/babel']
		}
	}
};
