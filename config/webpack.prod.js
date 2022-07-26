const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/**
 * @type {import('webpack').Configuration}
 */
const prodConfig = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: 2, // 并行压缩
      }),
    ],
    // 将运行时代码抽取到 `runtime` 文件中
    runtimeChunk: { name: 'runtime' },
  },
  // devtool: 'source-map',
};

module.exports = merge(baseConfig, prodConfig);
