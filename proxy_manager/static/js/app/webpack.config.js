var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    chunkFilename: 'bundle.js',
    publicPath: '/build/'
  },

  plugins: [
    /*new webpack.HotModuleReplacementPlugin()*/
  ],
  module: {
    loaders: [{
      test: /\.js[x]?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/
    }]
  }
};