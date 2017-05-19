module.exports = function (gulp, plugins) {
	var runSequence = require('run-sequence');
	var sass = plugins.sass;
	var sourcemaps = plugins.sourcemaps;
	var concatCss = plugins.concatCss;
	var cssnano = plugins.cssnano;
	var paths = require('../paths.json');
	var gutil = plugins.util;

	gulp.task('sass', function() {
	    return gulp.src(paths.sass.source)
	    	.pipe(sourcemaps.init())
	        .pipe(sass({
				outputStyle: 'compact'
			}))
	    	.pipe(sourcemaps.write())
			.pipe(gulp.dest(paths.sass.dest));
	});

	gulp.task('css:dev', function() {
		return gulp.src(paths.css.source)
				.pipe(gulp.dest(paths.css.dest));
	});

	gulp.task('sass:dev', function() {
		return gulp.src(paths.sass.source)
				.pipe(sourcemaps.init())
				.pipe(sass({
					outputStyle: 'compact'
				}))
				.pipe(sourcemaps.write())
				.pipe(gulp.dest(paths.release));
	});

	gulp.task('styles', function() {
		return gulp.src(paths.sass.source)
				.pipe(gutil.noop())
				.pipe(sass({
					outputStyle: 'compact'
				}))
				.pipe(gutil.noop())
				.pipe(concatCss('min.css'))
				.pipe(cssnano())
				.pipe(gulp.dest(paths.release));
	});

	gulp.task('mincss', ['styles'], function () {
		return gulp.src(paths.css.source)
				.pipe(gutil.noop())
				.pipe(concatCss('min.css'))
				.pipe(cssnano())
				.pipe(gulp.dest(paths.release));
	});
};