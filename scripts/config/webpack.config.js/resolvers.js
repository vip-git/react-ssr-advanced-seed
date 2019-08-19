const paths = require('../paths');
const path = require('path');

module.exports = {
  extensions: ['.js', '.mjs', '.json', '.jsx', '.css', '.ts', '.tsx'],
  modules: paths.resolveModules,
  alias: {
      "react-native$": "react-native-web/dist/cjs",
      // "@services": path.resolve(__dirname, '../../../src/client/web/app/common/services'),
      // "@components": path.resolve(__dirname, '../../../src/client/web/app/common/components'),
      // "@model": path.resolve(__dirname, '../../../src/client/web/app/common/model'),
      // "@config": path.resolve(__dirname, '../../../src/client/web/app/common/config'),
      // "@utils": path.resolve(__dirname, '../../../src/client/web/app/common/utils'),
      // "@styles": path.resolve(__dirname, '../../../src/client/web/app/common/styles'),
  },
};
