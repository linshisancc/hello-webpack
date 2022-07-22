const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'prod';

/**
 * @type {import('webpack').Configuration}
 */

const baseConfig = {
  mode: isProd ? "production" : "development",
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: `[name].${isProd ? '[chunkhash:8].' : ''}js`,
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.(js|jsx|tsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: `index.${isProd ? '[contenthash:8].' : ''}html`
    }),
    new ESLintPlugin({ extensions: ['.js', '.jsx', '.ts', '.tsx'] })
  ],
};

module.exports = baseConfig;