module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: __dirname,
    filename: 'dist/bundle.js'
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
  }
};
