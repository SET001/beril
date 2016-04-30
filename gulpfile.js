var gulp = require('gulp'),
	watch = require('gulp-watch');


gulp.task('pack', require('./tasks/pack')());
gulp.task('test', require('./tasks/test')());
gulp.task('shaders', require('./tasks/shaders.js')(gulp));
gulp.task('browserify', require('./tasks/browserify')(gulp));
gulp.task('compile_sources', require('./tasks/compile')(gulp, ['src/**/[^_]*.ts']));
gulp.task('compile_tests', require('./tasks/compile')(gulp, ['tests/**/[^_]*.ts']));

gulp.task('compile_all', gulp.parallel('compile_sources', 'compile_tests'));
gulp.task('build', gulp.series('compile_sources', 'shaders', 'pack'));
gulp.task('semver', gulp.series(require('./tasks/semver')()));

gulp.task('release', gulp.series('semver', require('./tasks/release')(gulp)));

gulp.task('default', function() {
	gulp.watch(['src/shaders/**/*.glsl'], gulp.series(['shaders']));
	gulp.watch(['src/**/[^_]*.ts'], gulp.series('compile_sources'));
	gulp.watch(['tests/**/[^_]*.ts'], gulp.series('compile_tests'));
});


// vinylPaths = require('vinyl-paths'),