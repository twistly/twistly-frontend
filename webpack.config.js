/* eslint-disable camelcase */
const path = require('path');
const webpack = require('webpack');
//
// const S3Uploader = require('webpack-s3-uploader');

// Ref: https://hackernoon.com/optimising-your-application-bundle-size-with-webpack-e85b00bab579
module.exports = {
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [path.resolve('src'), path.resolve('test'), path.resolve('node_modules/vue-awesome')],
            exclude: /node_modules/,
            query: {
                presets: ['minify']
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    js: 'babel-loader'
                }
            }
        }]
    },
    entry: {
        app: './src/main.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'https://static.twistly.xyz/dist/'
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            BASE_URL: 'https://api.twistly.xyz'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};

if (process.env.NODE_ENV === 'development') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]);
    module.exports.output.publicPath = '/dist/';
    module.exports.devServer = {
        historyApiFallback: true
    };
}
