/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable eol-last */
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
/* ignore coverage */
// eslint-disable-next-line import/no-extraneous-dependencies
const {
  getDefaultConfig,
} = require('metro-config');
/* ignore coverage */
module.exports = (async () => {
  const {
    resolver: {
      sourceExts,
      assetExts,
    },
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
          throwIfNamespace: false,
        },
      }),
    },
    resolver: {
      assetExts,
      sourceExts: [...sourceExts],
    },
  };
})();