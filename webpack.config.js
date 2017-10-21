const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: `${__dirname}/docs`,
    hashDigestLength: 8,
    filename: 'bundle.[hash].js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new CleanWebpackPlugin(['docs']),
    new ManifestPlugin({
      fileName: 'manifest.json'
    }),
    new DynamicCdnWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'FreeCodeCamp TwitchTV App',
      template: 'index.ejs',
      hash: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};
