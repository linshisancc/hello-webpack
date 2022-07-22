const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'prod';

/**
 * @type {import('webpack').Configuration}
 */

const baseConfig = {
  mode: isProd ? 'production' : 'development',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: `[name].${isProd ? '[chunkhash:8].' : ''}js`,
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory=true'
      },
      {
        test: /\.scss$/,
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024 * 12
          }
        }
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
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};

module.exports = baseConfig;