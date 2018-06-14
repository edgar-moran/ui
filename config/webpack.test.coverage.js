﻿const webpack = require('webpack'),
 webpackMerge = require('webpack-merge'),
         path = require('path'),
      helpers = require('./helpers'),
   testConfig = require('./webpack.test.js');

helpers.removeLoaders(testConfig, ['ts', 'tsx']);

module.exports = webpackMerge(testConfig, {
    module: {        
        /**
         * An array of Rules which are matched to requests when modules are created.
         *
         * See: https://webpack.js.org/configuration/module/#module-rules
         */
        rules: [{
            test: /\.ts[x]?$/,
            use: [{
                loader: 'awesome-typescript-loader' 
            }],
            include: [/node_modules/]
        }, {
            test: /\.ts$/,
            use: [{
                loader: 'awesome-typescript-loader'
            }],
            include: [/\.(e2e|spec)\.ts$/],
        }, {
            test: /\.ts[x]?$/,
            use: [{
                loader: 'istanbul-instrumenter-loader'
            }, {
                loader: 'awesome-typescript-loader'
            }, {
                loader: 'tslint-loader' 
            }],
            exclude: [/\.(e2e|spec)\.ts$/, /node_modules/]
        }]
    }
});