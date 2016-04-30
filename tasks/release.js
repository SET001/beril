var git = require('gulp-git');
var util = require('gulp-util');

var errorHandler = function(error){
	console.error(error);
}

module.exports = function(gulp){
	return function(done){
		gulp.src("./")
			.pipe(git.commit("Updated to version " + util.env.version, {args: "--all"}), errorHandler)
			.on('end', function(){
				console.log("asd");
				git.checkout('master', errorHandler);
				git.checkout('dev', errorHandler);
				console.log("asd");
			});
		// git.checkout('master', errorHandler);
		// git.merge('dev', errorHandler);
		// git.checkout('dev', errorHandler);
		// 
		done();
	}
}
