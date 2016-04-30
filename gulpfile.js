var gulp = require('gulp'),
	watch = require('gulp-watch');
	


// gulp.task('release', gulp.series('semver', function(done){
// 	var git = require('gulp-git');
// 	// git.commit('Updated version to ' + util.env.version);
// 	// git.push('origin', 'dev');
// 	done();	
// }));

gulp.task('test', require('./tasks/test')());
gulp.task('compose_shaders', require('./tasks/shaders.js')(gulp));
gulp.task('browserify', require('./tasks/browserify')(gulp));
gulp.task('compile_sources', require('./tasks/compile')(gulp, ['src/**/[^_]*.ts']));
gulp.task('compile_tests', require('./tasks/compile')(gulp, ['tests/**/[^_]*.ts']));
gulp.task('compile_all', gulp.parallel('compile_sources', 'compile_tests'));
gulp.task('build', gulp.series('compile_sources', 'browserify'));
gulp.task('semver', gulp.series(require('./tasks/semver')(), 'build'));
gulp.task('default', function() {
	gulp.watch(['src/shaders/**/*.glsl'], gulp.series(['compose_shaders', 'browserify']));
	gulp.watch(['src/**/[^_]*.ts'], gulp.series('compile_sources', 'browserify'));
	gulp.watch(['tests/**/[^_]*.ts'], gulp.series('compile_tests'));
});


// vinylPaths = require('vinyl-paths'),