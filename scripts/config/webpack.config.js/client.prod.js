const baseConfig = require('./client.base');

const config = {
  ...baseConfig,
  mode: 'production',
  watch: false,
};

config.output.filename = 'bundle.[hash:8].js';

module.exports = config;
