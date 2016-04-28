var gulp = require('gulp');
	ts = require('gulp-typescript'),
	watch = require('gulp-watch'),
	browserify = require('browserify'),
	vinylPaths = require('vinyl-paths'),
	source = require('vinyl-source-stream'),
	rename = require('gulp-rename'),
	gulpCopy = require('gulp-copy'),
	del = require('del'),
	util = require('gulp-util'),
	shadersComposer = require('./shadersComposer'),
	tsConfig = require('./tsconfig.json').compilerOptions,
	semver = require('semver'),
	Server = require('karma').Server;

gulp.task('karma', function (done) {
	new Server({
	    configFile:  __dirname + '/tests/karma.conf.js',
	    singleRun: false
	  }, done).start();
});

gulp.task('browserify', function(done){
	var b =  browserify({
		entries: ['./src/browserify.js', './src/shaders/shaders.js']
	});
	b.bundle()
		.on('error', function(err){
      console.log(err.message);
      console.log("ending stream...");
      this.emit('end');
    })
		.pipe(source('beril.js'))
		.pipe(gulp.dest('./build/'));
	done();
});

// gulp.task('clear', ['compile'], function (done) {
//   del([
//     '../site/beril.js',
//   ], {force: true});
//   done();
// });

gulp.task('compose_shaders', function(){
	return gulp.src(['src/shaders/**/[^_]*.glsl'])
		.pipe(shadersComposer('shaders.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('compile_tests', function(){
	return gulp.src([
		'tests/**/[^_]*.ts'
	], { base: "." })
		.pipe(ts(tsConfig))
		.pipe(gulp.dest('.'));
});

gulp.task('compile_sources', function(){
	return gulp.src([
		'src/**/[^_]*.ts',
	], { base: "." })
		.pipe(ts(tsConfig))
		.pipe(gulp.dest('.'));
});

gulp.task('compile_all', gulp.parallel('compile_sources', 'compile_tests'));

// // gulp.task('copy', ['browserify'], function(){
// // 	gulp.src('build/beril.js')
// // 		.pipe(gulpCopy('../site/', {prefix:1}));
// // 	return gulp.src('build/beril.js')
// // 		.pipe(gulpCopy('../../avalon/vendors/beril/', {prefix:2}));
// // });

gulp.task('semver', function (done) {
	var type =  'patch';
	if (util.env.major && util.env.minor ){

	} else {
		if (util.env.major) type = 'major';
		if (util.env.minor) type = 'minor';
	}
	var fs = require('fs');
	var packageConfig =  require('./package.json');
	packageConfig.version = semver.inc(packageConfig.version, type);
	var string = JSON.stringify(packageConfig, null, 2);
	fs.writeFile('./package.json', string);
	util.env.version = packageConfig.version;
	done();
});

gulp.task('release', gulp.series('semver', function(done){
	var git = require('gulp-git');
	// git.commit('Updated version to ' + util.env.version);
	// git.push('origin', 'dev');
	done();	
}));

gulp.task('default', function() {
	gulp.watch(['src/shaders/**/*.glsl'], gulp.series(['compose_shaders', 'browserify']));
	gulp.watch(['src/**/[^_]*.ts'], gulp.series('compile_sources', 'browserify'));
	gulp.watch(['tests/**/[^_]*.ts'], gulp.series('compile_tests'));
});
