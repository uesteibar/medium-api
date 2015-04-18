
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

var files = require('./gulp.config')();

gulp.task('jshint', function() {
	gulp.src(files.dev.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
    return gulp.src(files.dev.testjs, {read: false})
        .pipe(mocha({reporter: 'nyan', timeout: '5000'}));
});

gulp.task('develop', function () {
  nodemon({ script: 'server.js'
          , ext: 'js'
          , tasks: ['jshint', 'test'] })
    .on('restart', function () {
      console.log('restarted!')
    });
});
