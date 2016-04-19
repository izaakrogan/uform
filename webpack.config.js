var path = require('path');
var webpack = require('webpack');

var PROD = !!process.env.PROD_DEV;
module.exports = {
  devtool: 'eval',
  entry: PROD ?
    [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ]
  :
    ['./src/index.js']
  ,
  output: {
    path: path.join(__dirname, 'build'),
    filename: PROD ? "bundle.min.js" : 'bundle.js',
    publicPath: '/scripts/'
  },
  plugins: PROD ?
    [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      (new webpack.optimize.UglifyJsPlugin({minimize: true}))
    ]
    :
    [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};

// var path = require('path');
// var webpack = require('webpack');
//
// module.exports = {
//   devtool: 'eval',
//   entry: [
//     'react-hot-loader/patch',
//     'webpack-dev-server/client?http://localhost:3000',
//     'webpack/hot/only-dev-server',
//     './src/index'
//   ],
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: 'bundle.js',
//     publicPath: '/static/'
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin()
//   ],
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         loaders: ['babel'],
//         include: path.join(__dirname, 'src')
//       },
//       {
//         test: /\.json$/,
//         loader: 'json-loader'
//       }
//     ]
//   }
// };
