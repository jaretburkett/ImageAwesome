const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || '8080';

const config = {
    context: __dirname,
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        path.join(__dirname,'./src/index')
    ],
    target: 'electron-renderer',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/dist'),
        // publicPath: `http://localhost:${port}/dist/`,
        publicPath: '',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // include: [
                //     path.join(__dirname, 'src'),
                //     path.join(__dirname, 'renderer.js')
                // ],
                exclude: /node_modules/,
                query: {
                    presets: ['es2015-script', 'react'],
                    plugins:["transform-decorators-legacy", "transform-class-properties"]
                }
            },
            {
                test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader'
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/vertx/),
    ]
};

module.exports = config;