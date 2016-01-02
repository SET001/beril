var gulp = require('gulp'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch');

gulp.task('scripts', function() {
	return gulp.src([
		'src/beril*.js',
		'src/**/*.js',
	])
	.pipe(concat('beril.js'))
	.pipe(gulp.dest('build'));
});

gulp.task('default', function() {
	gulp.watch('src/**/*.js', ['scripts']);
});
