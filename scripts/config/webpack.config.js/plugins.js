const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

const env = require('../env')();

const shared = [];

const client = [
  new webpack.DefinePlugin(env.stringified),
  new webpack.DefinePlugin({
    __SERVER__: 'false',
    __CLIENT__: 'true',
  }),
  new CopyWebpackPlugin([{
    from: path.resolve(__dirname, '../../../src/client/shared/assets/redux-templates'),
    to: path.resolve(__dirname, '../../../docker/frontend/prod/build/client/static/assets/redux-templates')
  }]),
  new MiniCssExtractPlugin({
    filename:
            process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[contenthash].css',
    chunkFilename:
            process.env.NODE_ENV === 'development' ? '[id].css' : '[id].[contenthash].css',
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ManifestPlugin({ fileName: 'manifest.json' })
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
