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

function getBundler (opts) {
    return browserify({
        ...opts,
        debug: true
    })
    .transform(babelify)
}

export default function dev (opts = {}) {
    const { src, destFilename, destFolder, watch } = opts;

    return () => {
        let bundler;

        if (watch) {
            bundler = watchify(
                getBundler({
                    ...watchify.args,
                    entries: src
                })
            );
        } else {
            bundler = getBundler({ entries: src });
        }

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
