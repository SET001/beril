var git = require('gulp-git');
var util = require('gulp-util');

var errorHandler = function(error){
	console.error(error);
}

module.exports = function(gulp){
	return function(done){
		gulp.src("./")
			.pipe(git.commit("Updated to version " + util.env.version, {args: "--all"}, errorHandler));
		git.checkout('master', errorHandler);
		git.merge('dev', errorHandler);
		git.checkout('dev', errorHandler);
		git.push('origin', 'master', errorHandler);
		done();
	}
}