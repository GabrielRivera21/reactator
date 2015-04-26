/* global require, console */

/**
 * Tasks for building the React/Flux based App
 */

require('harmonize')();

var gulp = require('gulp'),
    _ = require('underscore'),
    babelify = require('babelify'),
    bower = require('gulp-bower'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    jest = require('gulp-jest'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    notify = require('gulp-notify'),
    Q = require('q'),
    react = require('gulp-react'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify'),
    yuidoc = require('gulp-yuidoc');


function cleanTask(paths) {
    return function() {
            return gulp.src(paths, {read:false})
                   .pipe(clean({force:true}));
        };
}

function copyTask(paths) {
    return gulp.src(paths[0])
            .pipe(gulp.dest(paths[1]));
}

function startTasks(tasks) {
    return function() {
        return gulp.start(tasks);
    };
}

function watchTasks(files, tasks) {
    return function() {
        return gulp.watch(files, tasks);
    };
}

/* Bower */
gulp.task('bower', function() {return bower();});

/* Clean */
gulp.task('clean-coverage', cleanTask(['coverage/**/*.*']));
gulp.task('clean', cleanTask(['dist/**/*.*', 'doc/**/*.*']));
gulp.task('clean-all', startTasks(['clean', 'clean-coverage']));

/* Copy */
gulp.task('copy', function() {
    return Q.allSettled(
        copyTask(['src/imgs/**/*', 'dist/imgs']),
        copyTask(['src/index.html', 'dist']),
        copyTask(['node_modules/bootstrap/dist/fonts/*', 'dist/fonts']),
        copyTask(['node_modules/font-awesome/fonts/*', 'dist/fonts']));
});

/* Connect */
gulp.task('connect', function() {
    return connect.server({
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
            depends: {jquery : 'jQuery'}
        }
    }
};

/* watchify */
gulp.task('watchify', function() {
    var bundler = watchify(browserify('./src/js/app.js', browserify_options));

    function rebundle() {
        return bundler
            .bundle()
            .on('error', notify.onError())
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist/js'))
            .pipe(connect.reload());
    }

    bundler.transform(babelify)
        .on('update', rebundle);

    return rebundle();
});

/* Browserify */
gulp.task('browserify', function() {
  return browserify('./src/js/app.js', browserify_options)
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'));
});

/* YUIDoc */
gulp.task('doc', function() {
    return gulp.src('src/**/*.js')
        .pipe(yuidoc())
        .pipe(gulp.dest('./doc'));
});

/* Jest */
gulp.task('jest', ['clean-coverage'], function () {
    return gulp.src('src')
        .pipe(jest({
            rootDir : "src/js/",
            scriptPreprocessor: "../../spec/support/jest-preprocessor.js",
            unmockedModulePathPatterns: ["node_modules/react"],
            testPathIgnorePatterns: ["node_modules", "spec/support"],
            moduleFileExtensions: ["js", "json", "react"],
            collectCoverage: true
        }));
});

/* JSHint */
gulp.task('jshint', function() {
    return gulp
        .src(['src/**/*.js'])
        .pipe(react())
        .on('error', function(err) {
            console.error('JSX ERROR in ' + err.fileName + "\n" + err.message);
            this.end();
        })
        .pipe(jshint({"esnext" : true}))
        .pipe(jshint.reporter(stylish));
});

/* Less */
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
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload());;
});

gulp.task('default'     , []         , startTasks(['jshint', 'build']));

gulp.task('build'       , ['clean']  , startTasks(['copy', 'less', 'browserify', 'doc']));
gulp.task('dev'         , []         , startTasks(['connect', 'watchify', 'watch-js', 'watch-tests', 'watch-less']));
gulp.task('install'     , ['bower']  , startTasks(['jshint', 'build', 'jest']));
gulp.task('test'        , ['jshint'] , startTasks(['jest']));
gulp.task('watch-js'    , []         , watchTasks(['src/**/*.*', '!src/**/*-test.js'], ['jshint']));
gulp.task('watch-less'  , []         , watchTasks('src/**/*.less', ['less']));
gulp.task('watch-tests' , []         , watchTasks('src/**/*-test.js', ['test']));
