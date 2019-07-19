// const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const mode = process.env.NODE_ENV || 'production';

const isProduction = mode === 'production';
const isDevelopment = mode === 'development';

module.exports = {
  entry: {
    main: './src/index'
  },
  mode,
  output: {
    path: `${__dirname}/docs`,
    hashDigestLength: 8,
    filename: 'js/bundle.[hash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/u,
        use: [
          isProduction && MiniCSSExtractPlugin.loader,
          isDevelopment && require.resolve('style-loader'),
          { loader: 'css-loader', options: { sourceMap: true, modules: true } }
        ].filter(Boolean)
      },
      {
        test: /\.html$/u,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.jsx?$/u,
        exclude: /node_modules/u,
        loaders: ['babel-loader']
      }
    ]
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          parse: {
            ecma: 6
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        cache: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'FreeCodeCamp TwitchTV App',
      template: 'index.ejs',
      hash: true
    }),
    new DynamicCdnWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css'
    })
  ],
  node: {
    fs: 'empty'
  }
};
