/*
cnpm i webpack webpack-dev-server jsx-loader react-hot-loader style-loader css-loader --dev-save

*/
var webpack = require('webpack');


module.exports = {
  // entry: './js/entry.js',
  entry: [
      //'webpack-dev-server/client?http://127.0.0.1:8080', // WebpackDevServer host and port
      //'webpack/hot/only-dev-server',
    './js/index.js' // Your appʼs entry point
  ],
  output: {
    path: __dirname + '/js/',
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [    
    {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,  
      query: {
        presets: ['es2015', 'react']        
      }
    }

    ]
  },
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin()
  ]
};