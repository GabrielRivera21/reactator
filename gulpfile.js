/* global require, console */

/**
 * Tasks for building the React/Flux based App
 */
var gulp = require('gulp');

require('harmonize')();

var _ = require('underscore');
var bower = require('gulp-bower');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var jest = require('gulp-jest');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var react = require('gulp-react');
var runSequence = require('run-sequence');
var stylish = require('jshint-stylish');
var yuidoc = require('gulp-yuidoc');

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
            .src(['dist/**/*.*', 'doc/**/*.*', 'coverage/**/*.*'], {read:false})
            .pipe(clean({force:true}));
});

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
        gulp
            .src(mapping[0])
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
        livereload: true
    });
});


/**
 * Browserify
 */
gulp.task('browserify', function() {
    return gulp
        .src('src/js/app.js')
        .pipe(browserify({
            debug: true, // Sourcemapping
            transform: 'reactify',
            shim : {
                bootstrap: {
                    path : "node_modules/bootstrap/dist/js/bootstrap.js",
                    exports : "bootstrap",
                    depends: {
                        jquery : 'jQuery'
                    }
                }
            }
        }))
        .on('error', function(err) {
            console.error(err.message);
            console.error(err.stack);
            this.end();
        })
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

/**
 * Jest
 */
gulp.task('jest', function () {
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
gulp.task('build', function() {
    runSequence(
            'clean',
            'copy',
            'less',
            'browserify',
            function() {});
});

/**
 * Test
 */
gulp.task('test', function(){
    runSequence('jshint', 'clean-coverage', 'jest', function(){});
});

/**
 * Default
 */
gulp.task('default', function() {
    runSequence('jshint', 'build', 'doc', function(){});
});

/**
 * Watch
 */
gulp.task('watch', function() {
    return gulp.watch('src/**/*.*', [
        'default'
    ]);
});

/**
 * Dev
 */
gulp.task('dev', ['connect', 'watch']);

/**
 * Install
 */
gulp.task('install', function() {
    runSequence('bower', 'default', function(){});
});
