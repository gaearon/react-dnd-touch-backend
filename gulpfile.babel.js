/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';

import js from './tasks/browserify';
import lint from './tasks/lint';

gulp.task('clean', () => {
    del.sync(['dist']);
    del.sync(['examples/*.browserified.js']);
});

// Lint
gulp.task('lint', lint);

// Compile example
gulp.task('example', js({
    src: './examples/js/index.js',
    destFilename: 'main.browserified.js',
    destFolder: './examples/'
}));

// Compile scripts
gulp.task('babel', () => {
    return gulp.src('src/**/*')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['clean', 'lint', 'example']);
gulp.task('dist', ['lint', 'clean', 'babel']);

gulp.task('default', ['dev']);
