/* global require, module */

require('harmonize')();

var gulp = require('gulp'),
    _ = require('lodash'),
    babelify = require('babelify'),
    bower = require('gulp-bower'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    connect = require('gulp-connect'),
    eventStream = require('event-stream'),
    less = require('gulp-less'),
    notify = require('gulp-notify'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify'),
    del = require('del'),
    vinylPaths = require('vinyl-paths');

var GulpTasks = {
    bower: function() {
        return function() {
            return new bower(); //eslint-disable-line
        };
    },

    watchify: function(root, entries, commonjs, requirejs, options) {
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
                        bundler = bundler.require(file, {expose: file});
                    });

                    bundler
                        .transform(babelify)
                        .on('update', function() {
                            console.log('Updating ' + root + entry.dest + '/' + entry.name);
                            rebundle();
                        });

                    return rebundle();
                })
            );
        };
    },

    browserify: function(root, entries, commonjs, requirejs, options) {
        return function() {
            return eventStream.merge(
                _.map(entries, function(entry) {
                    var bundler = browserify(entry.src, options);

                    _.map(commonjs, function(file) {
                        bundler = bundler.external(file);
                    });

                    _.map(requirejs, function(file) {
                        bundler = bundler.require(file, {expose: file});
                    });

                    return bundler
                            .transform(babelify)
                            .bundle()
                            .pipe(source(entry.name))
                            .pipe(buffer())
                            .pipe(sourcemaps.init({loadMaps: true}))
                            .pipe(uglify())
                            .pipe(sourcemaps.write('./'))
                            .pipe(gulp.dest(root + '/' + entry.dest));
                })
            );
        };
    },

    clean: function(paths) {
        return function() {
            return gulp
                    .src(paths, {read: false})
                    .pipe(vinylPaths(del));
        };
    },

    connect: function(options) {
        return function() {
            return connect.server(options);
        };
    },

    copy: function(root, entries) {
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

    less: function(root, entries, options) {
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

    start: function(tasks) {
        return function() {
            return gulp.start(tasks);
        };
    },

    watch: function(paths, tasks) {
        return function() {
            return gulp.watch(paths, tasks);
        };
    },

    initialize: function(srcPaths, config, nodePaths) {

        if (nodePaths !== undefined && _.isArray(nodePaths)) {
            process.env.NODE_PATH += nodePaths.join(':');
        }

        _.each(
            config.apps,
            function(project, name) {
                var _root = 'dist/' + name;

                var n = function(id) {
                    return id + '-' + name;
                };

                gulp.task(
                    n('clean'),
                    GulpTasks.clean([_root + '/*']));


                var commonCopy = project.common ? config.common.copy : [];

                gulp.task(
                    n('copy'),
                    GulpTasks.copy(_root, [].concat(commonCopy, project.copy)));

                //
                // less
                //
                gulp.task(
                    n('less'),
                    GulpTasks.less(_root, project.less, config.less));

                gulp.task(
                    n('watch-less'),
                    GulpTasks.watch(
                        project.less.map(function(entry) { return entry.src; }),
                        [n('less')]
                    ));

                //
                // connect
                //
                gulp.task(
                    n('connect'),
                    GulpTasks.connect(
                        _.extend(
                            {
                                root: _root,
                                fallback: project.fallback
                            },
                            config.connect
                        )
                    ));

                //
                // browserify and watchify
                //
                var commonJS = project.common ? config.common.js : [];

                if (project.common) {
                    gulp.task(
                        n('browserify-common'),
                        GulpTasks.browserify(
                            _root,
                            [{
                                'src': [],
                                'name': 'common.js',
                                'dest': '/js'
                            }],
                            [],
                            commonJS,
                            config.browserify));
                } else {
                    gulp.task(n('browserify-common'), []);
                }

                gulp.task(
                    n('browserify'),
                    GulpTasks.browserify(
                        _root,
                        project.js,
                        commonJS,
                        [],
                        config.browserify));

                gulp.task(
                    n('watchify'),
                    GulpTasks.watchify(
                        _root,
                        project.js,
                        commonJS,
                        [],
                        config.browserify));


                //
                // general helper
                //
                gulp.task(
                    n('build'),
                    [n('clean')],
                    GulpTasks.start([
                        n('copy'),
                        n('browserify-common'),
                        n('browserify'),
                        n('less')
                    ]));

                gulp.task(
                    n('dev'),
                    [n('build')],
                    GulpTasks.start([
                        n('watchify'),
                        n('watch-less')
                    ]));
            }
        );

        function all(id) {
            return Object.keys(config.apps).map(function(app) { return id + '-' + app;});
        }

        gulp.task('bower', GulpTasks.bower());

        gulp.task('clean-coverage', GulpTasks.clean(['coverage/*']));
        gulp.task('clean', ['clean-coverage'], GulpTasks.start(all('clean')));

        gulp.task('build', GulpTasks.start(all('build')));
        gulp.task('dev', ['build'], GulpTasks.start(all('dev')));

        gulp.task('install', ['bower'], GulpTasks.start(['build']));

        gulp.task('default',  function() {
            console.log('\nPossible targets are:');
            _.each(['install', 'build', 'clean'], function(name) {
                console.log('\t' + name);
            });

            console.log('\nProjects:');
            _.each(Object.keys(config.apps), function(name) {
                console.log(name);
                console.log('\t' + 'clean-' + name);
                console.log('\t' + 'build-' + name);
                console.log('\t' + 'dev-' + name);
                console.log('\t' + 'connect-' + name);
            });
        });


    }
};

module.exports = GulpTasks;
