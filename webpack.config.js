// const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: `${__dirname}/docs`,
    hashDigestLength: 8,
    filename: 'bundle.[hash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    rules: [
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
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'FreeCodeCamp TwitchTV App',
      template: 'index.ejs',
      hash: true
    }),
    new DynamicCdnWebpackPlugin()
  ]
};
