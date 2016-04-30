var browserify = require('browserify');
var source = require('vinyl-source-stream');

module.exports = function(gulp){
	return function(done){
		var b =  browserify({
			entries: ['./src/index.js', './src/shaders/shaders.js'],
			standalone: 'beril'

		});
		b.bundle()
			.on('error', function(err){
				this.emit('end');
			})
			.pipe(source('beril.js'))
			.pipe(gulp.dest('./build/'));
		done();
	}
}