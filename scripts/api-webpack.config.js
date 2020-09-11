const webpack = require('webpack');
const shell = require('shelljs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

shell.rm('-rf', `./docker/backend/prod/dist/*`);

module.exports = env => {
	console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
	console.log('Watch Files: ', env.watchFiles); // true
	return {
		entry: ['webpack/hot/poll?100', './src/server/main.ts'],
		watch: env.watchFiles === 'true',
		target: 'node',
		externals: [
			nodeExternals({
				whitelist: ['webpack/hot/poll?100']
			})
		],
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				}
			]
		},
		mode: 'production',
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
		},
		optimization: {
			// We no not want to minimize our code.
			minimize: false,
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, '../src/server/package.json'),
						to: path.resolve(
							__dirname,
							'../docker/backend/prod/dist/package.json'
						)
					}
				]
			}),
			new CopyWebpackPlugin({
				patterns: [{
					from: path.resolve(
						__dirname,
						'../src/server/app/modules/**/*.graphql'
					),
					to: path.resolve(__dirname, '../docker/backend/prod/dist/graphql/'),
					flatten: true
				}]
			})
		],
		output: {
			path: path.join(__dirname, '../docker/backend/prod/dist'),
			filename: 'server.js'
		}
	};
};
