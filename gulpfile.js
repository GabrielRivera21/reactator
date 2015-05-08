/* global require, console */

require('harmonize')();
var gulp = require('gulp'),
    _ = require('underscore'),
    GulpTasks = require('./build/GulpTasks.js'),
    config = require('./build/config.json');

gulp.task('bower', GulpTasks.bower());

gulp.task('clean-coverage', GulpTasks.clean(['coverage/*']));
gulp.task('clean-doc', GulpTasks.clean(['doc/*']));

gulp.task('connect', GulpTasks.connect(config.connect));

gulp.task('doc', ['clean-doc'], GulpTasks.doc('src/**/*.js', './doc'));

gulp.task('jshint', GulpTasks.jshint(['src/**/*.js']));

gulp.task('jest', ['clean-coverage'], GulpTasks.jest('src', config.jest));
gulp.task('test', ['jshint'], GulpTasks.start(['jest']));

gulp.task('watch-js',  GulpTasks.watch(['src/**/*.*', '!src/**/*-test.js'], ['jshint']));
gulp.task('watch-tests',  GulpTasks.watch('src/**/*-test.js', ['test']));

var projects = [];
var cleanAllTasks = ['clean-coverage', 'clean-doc'];
var buildAllTasks = [];
var devAllTasks = ['connect', 'watch-js', 'watch-tests'];

_.each(
    config.apps,
    function(project, name) {
        projects.push(name);
        cleanAllTasks.push(name+'-clean');
        buildAllTasks.push(name+'-build');

        devAllTasks.push(name+'-watch-less');
        devAllTasks.push(name+'-watchify');
        devAllTasks.push(name+'-watch-config');

        if (project.clean !== undefined) {
            gulp.task(name+'-clean', GulpTasks.clean([].concat([project.root+'/*'], project.clean)));
        } else {
            gulp.task(name+'-clean', GulpTasks.clean([project.root+'/*']));
        }

        gulp.task(name+'-copy', GulpTasks.copy(project.root, [].concat(config.common.copy, project.copy)));
        gulp.task(name+'-less', GulpTasks.less(project.root, project.less, config.less));

        gulp.task(name+'-browserify-common', GulpTasks.browserify(project.root, [{ "src": [], "name": "common.js", "dest": "/js" }], [], config.common.js, config.browserify));
        gulp.task(name+'-browserify', GulpTasks.browserify(project.root, project.js, config.common.js, [], config.browserify));

        gulp.task(name+'-watchify', GulpTasks.watchify(project.root, project.js, config.common.js, [], config.browserify));

        gulp.task(name+'-watch-less',  GulpTasks.watch('src/**/*.less', [name+'-less']));
        gulp.task(name+'-watch-config',  GulpTasks.watch('src/config/**/*.*', [name+'-copy']));


        gulp.task(name+'-build', [name+'-clean'], GulpTasks.start([name+'-copy', name+'-browserify-common', name+'-browserify', name+'-less']));

        gulp.task(name+'-dev', [name+'-build'], GulpTasks.start([name+'-watchify', name+'-watch-less', name+'-watch-config', 'watch-js', 'watch-tests']));
    }
);

gulp.task('clean-all', GulpTasks.start(cleanAllTasks));
gulp.task('build-all', GulpTasks.start(buildAllTasks));
gulp.task('dev-all', ['build-all'], GulpTasks.start(devAllTasks));

gulp.task('dev', GulpTasks.start(['connect', 'web-dev']));

gulp.task('install', ['bower'], GulpTasks.start(['jshint', 'jest', 'build-all']));

gulp.task('default',  function() {
    console.log('\nPossible targets are:');
    _.each(['install', 'test', 'jshint', 'doc', 'build-all', 'clean-all'], function(name) {
        console.log('\t'+name);
    });

    console.log("\nProjects:");
    _.each(projects, function(name) {
        console.log(name);
        console.log('\t'+name+'-clean');
        console.log('\t'+name+'-build');
        console.log('\t'+name+'-dev');
    });
});

