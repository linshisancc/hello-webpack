const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
// const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */

const devConfig = {
  devServer: {
    hot: true,
    open: true,
  },
  // 禁用产物优化
  optimization: {
    // removeAvailableModules: false,
    // removeEmptyChunks: false,
    // splitChunks: false,
    // minimize: false,
    // concatenateModules: false,
    // usedExports: false,
  },
};

module.exports = merge(baseConfig, devConfig);
