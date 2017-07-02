/* eslint-disable camelcase */
const path = require('path');
const webpack = require('webpack');

// Ref: https://hackernoon.com/optimising-your-application-bundle-size-with-webpack-e85b00bab579
module.exports = {
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['babili']
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
    entry: [
        './src/main'
    ],
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, './dist/'),
        publicPath: 'dist/'
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            BASE_URL: 'https://api.twistly.xyz'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};
