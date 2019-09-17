'use strict';
const Gulp = require('gulp');
const Gutil = require('gulp-util');
const Path = require('path');
const Webpack = require('webpack');
const WebpackAssetsManifest = require('webpack-assets-manifest');


let executionCount = 0;


Gulp.task('webpack', (callback) => {

    const plugins = [
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': `"${process.env.NODE_ENV}"`
            }
        }),
        new WebpackAssetsManifest({
            publicPath: true,
            entrypoints: true
        })
    ];

    let devtool = 'source-map';

    if (process.env.NODE_ENV === 'production') {
        devtool = 'cheap-module-source-map';
    }

    const mode = process.env.NODE_ENV || 'development';
    const config = {
        mode,
        watch: global.isWatching,
        entry: {
            account: './client/pages/account/index',
            admin: './client/pages/admin/index',
            main: './client/pages/main/index'
        },
        output: {
            publicPath: '/public/pages/',
            path: Path.resolve(__dirname, '../public/pages'),
            filename: mode === 'production' ? '[name].[contenthash].min.js' : '[name].js'
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [{
                test: /\.jsx?$/,
                include: [
                    Path.resolve(__dirname, '../client')
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }]
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        devtool,
        plugins
    };

    Webpack(config, (err, stats) => {

        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }

        Gutil.log('[webpack]', stats.toString({
            colors: true,
            chunkModules: false
        }));

        if (executionCount === 0) {
            callback();
        }

        executionCount += 1;
    });
});
