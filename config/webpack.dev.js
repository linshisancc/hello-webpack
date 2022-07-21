const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */

const devConfig = {
  devServer: {
    hot: true,
    open: true
  }
};

module.exports = merge(baseConfig, devConfig);