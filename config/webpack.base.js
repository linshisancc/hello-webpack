const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'prod';


/**
 * @type {import('webpack').Configuration}
 */

const baseConfig = {
  mode: isProd ? "production" : "development",
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: `index.${isProd && '[chunkhash:8].'}js`,
    path: path.join(__dirname, '../dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: `index.${isProd && '[contenthash:8].'}html`
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};

module.exports = baseConfig;