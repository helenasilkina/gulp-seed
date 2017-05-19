module.exports = function (gulp) {
	var htmlmin = require('gulp-htmlmin');
	var paths = require('../paths.json');
	var htmlreplace = require('gulp-html-replace');

	gulp.task('html:dev', function() {
		return gulp.src(paths.html.source)
				.pipe(gulp.dest(paths.html.dest));
	});

	gulp.task('html', function() {
		return gulp.src(paths.html.source)
				.pipe(htmlreplace({
					'js': 'min.js?v=' + Date.now(),
					'css': 'min.css?v=' + Date.now()
				}))
				.pipe(htmlmin({collapseWhitespace: true}))
				.pipe(gulp.dest(paths.html.dest));
	});
};