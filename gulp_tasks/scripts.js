module.exports = function (gulp, plugins) {
	var paths = require('../paths.json');
	var addStream = require('add-stream');
	var templateCache = require('gulp-angular-templatecache');

	function prepareTemplates() {
		return gulp.src(paths.templates.base)
				.pipe(templateCache({
					module: 'Module',
					transformUrl: function (url) {
						return 'scripts/modules/' + url;
					}
				}));
	}


	gulp.task('scripts', function() {
		return gulp.src(paths.scripts.source, { cwd: paths.scripts.base})
				.pipe(addStream.obj(prepareTemplates()))
				.pipe(plugins.ngAnnotate())
				.pipe(plugins.uglify())
				.pipe(plugins.concat('min.js'))
				.pipe(gulp.dest(paths.release));
	});

	gulp.task('scripts:copy', function () {
		return gulp.src([paths.scriptsCopy.base + '/**/**'])
				.pipe(gulp.dest(paths.scriptsCopy.dest));
	});

	gulp.task('scripts:dev', ['scripts:copy']);
};