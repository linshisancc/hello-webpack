const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const getStyleLoader = (test, preLoader) => {
  const use = [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          mode: (resoucePath) => {
            // Callback must return "local", "global", or "pure" values
            if (resoucePath.includes('src/styles')) {
              // 设置公共样式目录不进行类名模块化
              return 'global';
            }
            return 'local';
          },
          localIdentName: '[path][name]__[local]--[hash:base64:5]"',
        },
      },
    },
  ];
  preLoader ? use.concat(preLoader, 'postcss-loader') : use.concat('postcss-loader');
  return {
    test,
    exclude: path.join(__dirname, '../node_modules/'),
    use,
  };
};

// const smp = new SpeedMeasurePlugin(); // 分析 loader 和 plugin 耗时

/**
 * @type {import('webpack').Configuration}
 */
const baseConfig = {
  mode: isProd ? 'production' : 'development',
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: `[name].${isProd ? '[contenthash:8].' : ''}js`,
    path: path.join(__dirname, '../dist'),
  },
  // 开启持久化缓存
  cache: {
    type: 'filesystem',
  },
  stats: 'errors-only',
  module: {
    rules: [
      // 自定义 css loader
      getStyleLoader(/\.css$/),
      getStyleLoader(/\.scss$/, 'sass-loader'),
      getStyleLoader(/\.less$/, 'less-loader'),
      // 第三方组件库 loader
      {
        test: /\.(css|less)$/,
        include: path.join(__dirname, '../node_modules/antd/dist/antd.css'),
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(m?js|jsx|tsx|ts)$/,
        exclude: path.join(__dirname, '../node_modules'),
        use: 'babel-loader',
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        exclude: path.join(__dirname, '../node_modules'),
        type: 'asset/resource',
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        exclude: path.join(__dirname, '../node_modules'),
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1024 * 8,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: `index.${isProd ? '[contenthash:8].' : ''}html`,
    }),
    new ESLintPlugin({
      extensions: ['.ts', '.tsx'],
      cache: true,
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [!isProd ? 'Your application is running in http://localhost:8080' : ''],
      },
      clearConsole: true,
    }),
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
          idHint: 'vendors',
          name: 'vendors',
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          idHint: '',
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  // 设置产物体积大小阈值
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  // 分离三方库
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
};

module.exports = baseConfig;
