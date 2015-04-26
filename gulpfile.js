/* global require, console */

require('harmonize')();

/**
 * Tasks for building the React/Flux based App
 */
var gulp = require('gulp'),
    _ = require('underscore'),
    bower = require('gulp-bower'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    jest = require('gulp-jest'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    react = require('gulp-react'),
    stylish = require('jshint-stylish'),
    yuidoc = require('gulp-yuidoc'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

/**
 * Bower
 */
gulp.task('bower', function() {
  return bower();
});

/**
 * Clean
 */
gulp.task('clean-coverage', function() {
    return gulp
            .src(['coverage/**/*.*'], {read:false})
            .pipe(clean({force:true}));
});

gulp.task('clean', function() {
    return gulp
            .src(['dist/**/*.*', 'doc/**/*.*'], {read:false})
            .pipe(clean({force:true}));
});

gulp.task('clean-all', ['clean', 'clean-coverage']);

/**
 * Copy
 */
gulp.task('copy', function() {
    var mappings = [
        ['src/imgs/**/*', 'dist/imgs'],
        ['src/index.html', 'dist'],
        ['node_modules/bootstrap/dist/fonts/*', 'dist/fonts'],
        ['node_modules/font-awesome/fonts/*', 'dist/fonts']
    ];

    _.each(mappings, function(mapping){
        gulp.src(mapping[0])
            .pipe(gulp.dest(mapping[1]));
    });
});

/**
 * Connect
 */
gulp.task('connect', function() {
    connect.server({
        port: 8080,
        root: 'dist',
        livereload: true,
        fallback: 'dist/index.html'
    });
});

var browserify_options = {
    debug: true,
    shim : {
        bootstrap: {
            path : "node_modules/bootstrap/dist/js/bootstrap.js",
            exports : "bootstrap",
            depends: {
                jquery : 'jQuery'
            }
        }
    }
};

/**
 * Browserify
 */
gulp.task('browserify', function() {
  return browserify('./src/js/app.js', browserify_options)
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

/**
 * Jest
 */
gulp.task('jest', ['clean-coverage'], function () {
    return gulp.src('src').pipe(jest({
        rootDir : "src/js/",
        scriptPreprocessor: "../../spec/support/jest-preprocessor.js",
        unmockedModulePathPatterns: [
            "node_modules/react"
        ],
        testPathIgnorePatterns: [
            "node_modules",
            "spec/support"
        ],
        moduleFileExtensions: [
            "js",
            "json",
            "react"
        ],
        collectCoverage: true
    }));
});

/**
 * JSHint
 */
gulp.task('jshint', function() {
    return gulp
        .src([
            'src/**/*.js'
        ])
        .pipe(react())
        .on('error', function(err) {
            console.error('JSX ERROR in ' + err.fileName);
            console.error(err.message);
            this.end();
        })
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

/**
 * Less
 */
gulp.task('less', function() {
    return gulp
        .src([
            'src/css/style.less'
        ])
        .pipe(less({
            options: {
                compress: false,
                yuicompress: false,
                optimization: 10
            }
        }))
        .pipe(gulp.dest('dist/css/'));
});

/**
 * YUIDoc
 */
gulp.task('doc', function() {
    return gulp.src('src/**/*.js')
        .pipe(yuidoc())
        .pipe(gulp.dest('./doc'));
});

/**
 * Build
 */
gulp.task('build', ['clean'], function() {
    gulp.start([
            'copy',
            'less',
            'browserify',
            'doc'
        ]);
});

/**
 * Test
 */
gulp.task('test', ['jshint'], function(){
    gulp.start([
            'jest'
        ]);
});

/**
 * Default
 */
gulp.task('default', function() {
    gulp.start(['jshint', 'build']);
});

/**
 * Watch
 */
gulp.task('watch', function() {
    return gulp.watch(['src/**/*.*', '!src/**/*-test.js'], [
        'default'
    ]);
});

/**
 * Watch tests
 */
gulp.task('watch-test', function() {
    return gulp.watch('src/**/*-test.js', [
        'clean-coverage',
        'test'
    ]);
});

/**
 * Dev
 */
gulp.task('dev', ['connect', 'watch', 'watch-test']);

/**
 * Install
 */
gulp.task('install', ['bower'], function() {
    gulp.start(['default']);
});
