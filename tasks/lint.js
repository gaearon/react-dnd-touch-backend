/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';
import gulp from 'gulp';
import eslint from 'gulp-eslint';

export default function lint () {
    gulp.src(['./src/*', './examples/*.js'])
        .pipe(eslint({
            useEslintrc: true
        }))
        .pipe(eslint.format());
}
