const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

const env = require('../env')();

const shared = [];

const client = [
	new webpack.DefinePlugin(env.stringified),
	new webpack.DefinePlugin({
		__SERVER__: 'false',
		__CLIENT__: 'true'
	}),
	new CopyWebpackPlugin([
		{
			from: path.resolve(
				__dirname,
				'../../../src/client/shared/assets/redux-templates'
			),
			to: path.resolve(
				__dirname,
				'../../../docker/frontend/prod/build/client/static/assets/redux-templates'
			)
		}
	]),
	new CopyWebpackPlugin([
		{
			from: path.resolve(
				__dirname,
				'../../../src/client/shared/assets/images/icons'
			),
			to: path.resolve(
				__dirname,
				'../../../docker/frontend/prod/build/client/static'
			)
		}
	]),
	new CopyWebpackPlugin([
		{
			from: path.resolve(
				__dirname,
				'../../../manifest.json'
			),
			to: path.resolve(
				__dirname,
				'../../../docker/frontend/prod/build/client/static/manifest.json'
			)
		}
	]),
	new MiniCssExtractPlugin({
		filename:
			process.env.NODE_ENV === 'development'
				? '[name].css'
				: '[name].[contenthash].css',
		chunkFilename:
			process.env.NODE_ENV === 'development'
				? '[id].css'
				: '[id].[contenthash].css'
	}),
	new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ManifestPlugin({ fileName: 'manifest.json' }),
  new WorkboxPlugin.GenerateSW({
    // these options encourage the ServiceWorkers to get in there fast
    // and not allow any straggling "old" SWs to hang around
    clientsClaim: true,
    skipWaiting: true
  })
];

if (process.env.NODE_ENV === 'production') {
  client.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false }
    })
  );
}

const server = [
  new webpack.DefinePlugin({
    __SERVER__: 'true',
    __CLIENT__: 'false',
  }),
];

module.exports = {
  shared,
  client,
  server,
};
