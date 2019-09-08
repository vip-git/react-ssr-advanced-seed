const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const babelLoader = {
  test: /\.(ts|js|jsx|tsx)$/,
  exclude: /node_modules\/(?!(@omega-web-components|@omega-shared-components|@omega-core|@omega-state-machines|@omega-web-containers)\/).*/,
  loader: 'babel-loader',
  options: {
    "compact": true,
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                "targets": {
                    "browsers": ["last 2 versions", "ie >= 9"]
                }
            }
        ],
        "@babel/typescript",
        "@babel/preset-react",
    ],
    "plugins": [
        '@babel/plugin-transform-runtime',
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-syntax-dynamic-import"
    ],
    "env": {
        "test": {
            "plugins": [
              "@babel/plugin-transform-modules-commonjs",
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-syntax-dynamic-import"
            ]
        }
    }
  }
};

const cssLoaderClient = {
	test: /\.(css|scss)$/,
	exclude: /node_modules\/(?!(@omega-web-components|@omega-shared-components|@omega-core|@omega-state-machines|@omega-web-containers)\/).*/,
	use: [
		'css-hot-loader',
		MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				localsConvention: 'camelCase',
				modules: {
					localIdentName: '[name]__[local]--[hash:base64:5]'
				},
				importLoaders: 1,
				sourceMap: true
			}
		},
		{
			loader: 'postcss-loader',
			options: {
				sourceMap: true
			}
		}
	]
};

const cssLoaderServer = {
	test: /\.css$/,
	exclude: /node_modules\/(?!(@omega-web-components|@omega-shared-components|@omega-core|@omega-state-machines|@omega-web-containers)\/).*/,
	use: [
		{
			loader: 'css-loader/locals',
			options: {
				localsConvention: 'camelCase',
				importLoaders: 1,
				modules: {
					localIdentName: '[name]__[local]--[hash:base64:5]'
				}
			}
		},
		{
			loader: 'postcss-loader',
			options: {
				sourceMap: true
			}
		}
	]
};

const urlLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: require.resolve('url-loader'),
  options: {
    limit: 2048,
    name: 'assets/[name].[hash:8].[ext]',
  },
};

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false,
  },
};

const fileLoaderClient = {
  exclude: [/\.(js|css|mjs|html|json|ejs|ts|tsx)$/],
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[hash:8].[ext]',
      },
    },
  ],
};

const fileLoaderServer = {
  exclude: [/\.(js|css|mjs|html|json|ejs)$/],
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[hash:8].[ext]',
        emitFile: false,
      },
    },
  ],
};

// Write css files from node_modules to its own vendor.css file
const externalCssLoaderClient = {
  test: /\.css$/,
  include: /node_modules/,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
};

// Server build needs a loader to handle external .css files
const externalCssLoaderServer = {
  test: /\.css$/,
  include: /node_modules/,
  loader: 'css-loader/locals',
};

const eslintLoaderClient = {
  test: /\.js$/,
  exclude: /node_modules\/(?!(@omega-web-components|@omega-shared-components|@omega-core|@omega-state-machines|@omega-web-containers)\/).*/,
  loader: 'eslint-loader',
  options: {
    eslint: {
      configFile: path.join(__dirname, '.eslintrc.js'),
      failOnWarning: false,
      failOnError: true,
      ignorePatten: ['node_modules', 'dist'],
    },
  },
};

const client = [
  {
    oneOf: [
      babelLoader,
      eslintLoaderClient,
      cssLoaderClient,
      urlLoaderClient,
      fileLoaderClient,
      externalCssLoaderClient,
    ],
  },
];
const server = [
  {
    oneOf: [
      babelLoader,
      cssLoaderServer,
      urlLoaderServer,
      fileLoaderServer,
      externalCssLoaderServer,
    ],
  },
];

module.exports = {
  client,
  server,
};
