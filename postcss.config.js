/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
const paths = require('./scripts/config/paths');
//  "postcss-custom-properties": "9.0.1", has ongoing vulneriblity hence commented
module.exports = {
  plugins: [
    require('postcss-import')({
      path: [paths.srcShared],
    }),
    require('postcss-nested')(),
    // require('postcss-custom-properties')(),
    require('postcss-flexbugs-fixes')(),
    require('autoprefixer')({
    }),
    // require('postcss-custom-properties')(),
    require('postcss-assets')({
      basePath: './assets',
    }),
    require('postcss-normalize')(),
  ],
  sourceMap: true,
};
