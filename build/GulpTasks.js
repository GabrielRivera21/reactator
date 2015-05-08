/* global require, module */

var gulp = require('gulp'),
    _ = require('underscore'),
    babelify = require('babelify'),
    bower = require('gulp-bower'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    eventStream = require('event-stream'),
    jest = require('gulp-jest'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    notify = require('gulp-notify'),
    react = require('gulp-react'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify'),
    yuidoc = require('gulp-yuidoc');

var GulpTasks = {
    bower : function() {
        return function() {
            return new bower();
        };
    },

    watchify : function(root, entries, commonjs, requirejs, options) {
        return function() {
            return eventStream.merge(
                _.map(entries, function(entry) {
                    var bundler = watchify(browserify(entry.src, options));

                    function rebundle() {
                        return bundler
                            .bundle()
                            .on('error', notify.onError())
                            .pipe(source(entry.name))
                            .pipe(buffer())
                            .pipe(sourcemaps.init({loadMaps: true}))
                            .pipe(sourcemaps.write('./'))
                            .pipe(gulp.dest(root + '/' + entry.dest))
                            .pipe(connect.reload());
                    }

                    _.map(commonjs, function(file) {
                        bundler = bundler.external(file);
                    });

                    _.map(requirejs, function(file) {
                        bundler = bundler.require(file, {expose:file});
                    });

                    bundler
                        .transform(babelify)
                        .on('update', function() {
                            console.log("Updating " + root + entry.dest + '/' + entry.name);
                            rebundle();
                        });

                    return rebundle();
                })
            );
        };
    },

    browserify : function(root, entries, commonjs, requirejs, options) {
        return function() {
            return eventStream.merge(
                _.map(entries, function(entry) {
                    var bundler = browserify(entry.src, options);
                    _.map(commonjs, function(file) {
                        bundler = bundler.external(file);
                    });

                    _.map(requirejs, function(file) {
                        bundler = bundler.require(file, {expose:file});
                    });

                    return bundler
                            .transform(babelify)
                            .bundle()
                            .pipe(source(entry.name))
                            .pipe(buffer())
                            .pipe(sourcemaps.init({loadMaps:true}))
                            .pipe(uglify())
                            .pipe(sourcemaps.write('./'))
                            .pipe(gulp.dest(root + '/' + entry.dest));
                })
            );
        };
    },

    clean : function(paths) {
        return function() {
            return gulp
                    .src(paths, {read:false})
                    .pipe(clean({force:true}));
        };
    },

    connect : function(options) {
        return function() {
            return connect.server(options);
        };
    },

    copy : function(root, entries) {
        return function() {
            return eventStream.merge(
                _.map(entries, function(entry) {
                    return gulp
                        .src(entry.src)
                        .pipe(gulp.dest(root + '/' + entry.dest));
                })
            );
        };
    },

    doc : function(paths, dest) {
        return function() {
            return gulp
                .src(paths)
                .pipe(yuidoc())
                .pipe(gulp.dest(dest));
        };
    },

    jest : function(src, options) {
        return function () {
            return gulp
                .src(src)
                .pipe(jest(options));
        };
    },

    jshint : function(paths) {
        return function() {
            return gulp
                .src(paths)
                .pipe(react())
                .on('error', notify.onError())
                .pipe(jshint({"esnext" : true}))
                .pipe(jshint.reporter(stylish));
        };
    },

    less : function(root, entries, options) {
        return function() {
            return eventStream.merge(
                _.map(entries, function(entry) {
                    return gulp
                        .src(entry.src)
                        .pipe(less(options))
                        .pipe(gulp.dest(root + '/' + entry.dest))
                        .pipe(connect.reload());
                })
            );
        };
    },

    start : function(tasks) {
        return function() {
            return gulp.start(tasks);
        };
    },

    watch : function(paths, tasks) {
        return function() {
            return gulp.watch(paths, tasks);
        };
    }
};

module.exports = GulpTasks;
