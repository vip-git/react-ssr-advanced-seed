const paths = require('../paths');
const path = require('path');

module.exports = {
  extensions: ['.js', '.mjs', '.json', '.jsx', '.css', '.ts', '.tsx'],
  modules: paths.resolveModules,
  alias: {
      "@services": path.resolve(__dirname, '../../../src/client/app/common/services'),
      "@components": path.resolve(__dirname, '../../../src/client/app/common/components'),
      "@config": path.resolve(__dirname, '../../../src/client/app/common/config'),
      "@utils": path.resolve(__dirname, '../../../src/client/app/common/utils'),
      "@mocks": path.resolve(__dirname, '../../../src/client/app/common/mocks'),
      "@styles": path.resolve(__dirname, '../../../src/client/app/common/styles'),
  },
};
