var gulp = require('gulp'),
	concat = require('gulp-concat'),
	ts = require('gulp-typescript'),
	watch = require('gulp-watch');

gulp.task('ts_src', function(){
	return gulp.src([
		'src/beril.ts',
		'src/**/*.ts',
	])
	.pipe(ts({
		noImplicitAny: true,
		module: 'commonjs',
		out: 'beril.js'
	}))
	.pipe(gulp.dest('./build/'));
});

gulp.task('ts_tests', function(){
	return gulp.src([
		'tests/**/*.ts',
	])
	.pipe(ts({
		noImplicitAny: true,
		module: 'commonjs',
		out: 'tests.js'
	}))
	.pipe(gulp.dest('build/'));
});

gulp.task('ts', function(){
	gulp.start('ts_src', 'ts_tests');
});

gulp.task('default', function() {
	// gulp.watch('src/**/*.js', ['scripts']);
	gulp.watch('src/**/*.ts', ['ts']);
});
