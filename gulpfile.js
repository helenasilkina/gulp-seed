var gulp = require('gulp-param')(require('gulp'), process.argv);
var plugins = require('gulp-load-plugins')();
var taskPath = './gulp_tasks/';
var taskList = require('fs').readdirSync(taskPath);
var runSequence = require('run-sequence');
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');

taskList.forEach(function (taskFile) {
	require(taskPath + taskFile)(gulp, plugins);
});

gulp.task('jshint', function() {
	return gulp.src([
			'gulpfile.js',
			'gulp_tasks/*.js',
			'src/static/scripts/*.js',
			'src/static/scripts/common/*.js',
			'src/static/scripts/common/*/*.js',
			'src/static/scripts/modules/*.js',
			'src/static/scripts/modules/*/*.js'
		])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('start', ['sass', 'server']);

gulp.task('dev', ['sass:dev', 'clean'], function () {
	return runSequence('css:dev', 'scripts:dev', 'images', 'fonts', 'html:dev');
});

gulp.task('prod', ['sass', 'clean'], function () {
	return runSequence('scripts', 'mincss', 'images', 'fonts', 'html');
});