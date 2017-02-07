/*
cnpm i webpack webpack-dev-server jsx-loader react-hot-loader style-loader css-loader --dev-save

*/
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //css文件独立出来
var HtmlWebpackPlugin = require('html-webpack-plugin'); //

module.exports = {
    // entry: './js/entry.js',
    entry: [
        //'webpack-dev-server/client?http://127.0.0.1:8080', // WebpackDevServer host and port
        //'webpack/hot/only-dev-server',
        './js/index.js' // Your app始s entry point
        //'./src/components/GalleryByReactApp.js'
    ],
    output: {
        path: __dirname + '/dist/',
        filename: 'js/app.js',
        publicPath: '/dist/'  //'开发时'
       //publicPath: './', //发布时
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
            loader: ExtractTextPlugin.extract('','css-loader!autoprefixer-loader?{browsers:["last 2 version", "> 1%"]}!sass?sourceMap')
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "> 1%"]}'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(png|jpe?g|gif|eot|svg|ttf|woff2?)$/,
            loader: "url-loader?limit=8192&name=images/[name].[ext]" //[hash:8].
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoErrorsPlugin()

        //提取公共commjs
        new webpack.optimize.CommonsChunkPlugin("commons", "js/commons.js"),
        //提取require的css 合并到某个文件
        new ExtractTextPlugin("./css/[name].css", {
            allChunks: true
        }),
        new HtmlWebpackPlugin({ // Also generate a test.html            
            template: 'index.html',
            filename: 'template.html'
        }),
        //定义环境 程序中判断
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        //压缩js 除$ jQuery
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$', 'jQuery']
            },
            compress: {
                warnings: false
            }
        })
    ]
};
