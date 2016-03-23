var gulp = require('gulp'),
	ts = require('gulp-typescript'),
	watch = require('gulp-watch'),
	browserify = require('browserify'),
	vinylPaths = require('vinyl-paths'),
	source = require('vinyl-source-stream'),
	rename = require('gulp-rename'),
	gulpCopy = require('gulp-copy'),
	del = require('del'),
	Server = require('karma').Server;

gulp.task('compilew', function(){
	gulp.watch(['./src/**/[^_]*.ts'], ['compile']);
});

gulp.task('karma', function (done) {
	new Server({
	    configFile:  __dirname + '/src/tests/karma.conf.js',
	    singleRun: false
	  }, done).start();
});

gulp.task('browserify', ['clear'], function(){
	var b =  browserify({
		entries: './src/engine/browserify.js'
	});
	return b.bundle()
		.on('error', function(err){
      console.log(err.message);
      console.log("ending stream...");
      this.emit('end');
    })
		.pipe(source('beril.js'))
		.pipe(gulp.dest('./build/'));
});

gulp.task('clear', ['compile'], function (done) {
  del([
    '../site/beril.js',
  ], {force: true});
  done();
});

gulp.task('compile', function(){
	return gulp.src([
		'src/**/[^_]*.ts'
	])
	.pipe(ts({
		noImplicitAny: false,
		noExternalResolve: true,
		module: 'commonjs'
	}))
	.pipe(gulp.dest('./build/'));
});


gulp.task('copy', ['browserify'], function(){
	gulp.src('build/beril.js')
		.pipe(gulpCopy('../site/', {prefix:1}));
	return gulp.src('build/beril.js')
		.pipe(gulpCopy('../../avalon/vendors/beril/', {prefix:2}));
});

gulp.task('default', ['copy']);

gulp.task('watch', function() {
	gulp.watch('./src/**/[^_]*.ts', ['default']);
});
