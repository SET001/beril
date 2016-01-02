var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sass = require('gulp-ruby-sass'),
	watch = require('gulp-watch');

gulp.task('scripts', function() {
	return gulp.src([
		'src/**/*.js',
	])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('build'));
});

gulp.task('styles', function(){
	return sass('src/sass/*')
		.on('error', sass.logError)
		.pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
	// gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('src/sass/**/*.sass', ['styles']);
});

gulp.task('default', function() {
	gulp.start('scripts', 'styles');
});
