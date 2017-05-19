module.exports = function (gulp) {
	var htmlmin = require('gulp-htmlmin');
	var paths = require('../paths.json');
	var rimraf = require('gulp-rimraf');

	gulp.task('clean', function () {
		return gulp.src(paths.release+ '/', {read: false})
				.pipe(rimraf());
	});

	gulp.task('images', function() {
		return gulp.src(paths.images.source)
				.pipe(gulp.dest(paths.images.dest));
	});

	gulp.task('fonts', function() {
		return gulp.src(paths.fonts.source)
				.pipe(gulp.dest(paths.fonts.dest));
	});
};