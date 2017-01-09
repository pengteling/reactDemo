/*
cnpm i webpack webpack-dev-server jsx-loader react-hot-loader style-loader css-loader --dev-save

*/
var webpack = require('webpack');


module.exports = {
    // entry: './js/entry.js',
    entry: [
        //'webpack-dev-server/client?http://127.0.0.1:8080', // WebpackDevServer host and port
        //'webpack/hot/only-dev-server',
        //'./js/index.js' // Your app始s entry point
        './src/components/GalleryByReactApp.js'
    ],
    output: {
        path: __dirname + '/js/',
        filename: 'bundle.js',
        publicPath: '/js/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            // exclude: /node_modules/,  
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "> 1%"]}!sass?sourceMap'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "> 1%"]}'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(png|jpe?g|gif|eot|svg|ttf|woff2?)$/,
            loader: "url-loader?limit=8192"
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoErrorsPlugin()
    ]
};
