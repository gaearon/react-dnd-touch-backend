/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import babelify from 'babelify';
import browserify from 'browserify';
import gulp from 'gulp';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';
import watchify from 'watchify';

function rebundle (bundle, opts) {
    return bundle
        .on('error', gutil.log)
        .pipe(source(opts.destFilename))
        .pipe(gulp.dest(opts.destFolder))
        .on('end', opts.onEnd || Function.prototype);
}

export default function dev (opts = {}) {
    const { src, destFilename, destFolder } = opts;

    return () => {
        const bundler = watchify(
            browserify({
                ...watchify.args,
                entries: src,
                debug: true
            })
            .transform(babelify)
        );

        bundler.on('log', gutil.log);

        function rebundleFn () {
            rebundle(bundler.bundle(), {
                destFolder: destFolder,
                destFilename: destFilename
            });
        }

        bundler.on('update', rebundleFn);

        rebundleFn();
    };
}
