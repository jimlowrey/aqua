'use strict';
const Gulp = require('gulp');
const Nodemon = require('gulp-nodemon');
//const Config = require('./../config.js');
require('./../config.js');

Gulp.task('nodemon', () => {

    let nodeArgs = [];

    if (process.env.INSPECTER){
        nodeArgs = ['--inspect'];
    }

    if (process.env.DEBUGGER) {
        nodeArgs.push('--debug');
        console.log('debug');
    }

    const config = {
        script: 'server.js',
        ext: 'js md',
        ignore: [
            'client/**/*',
            'gulp/**/*',
            'public/**/*',
            'node_modules/**/*'
        ],
        nodeArgs
    };

    Nodemon(config).on('restart', (files) => {

        console.log('change detected:', files);
    });
});
