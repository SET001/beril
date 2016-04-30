var git = require('gulp-git');
var util = require('gulp-util');

var errorHandler = function(error){
	console.error(error);
}

module.exports = function(gulp){
	return function(done){
		console.log("Ad");
		gulp.src("./")
			.pipe(git.commit("Updated to version " + util.env.version, {args: "--all"}, errorHandler))
			// .pipe(git.checkout('master', errorHandler))
			;
			// .pipe(git.merge('dev'), errorHandler)
			// .pipe(git.checkout('dev'), errorHandler)
			// .pipe(git.push('origin', 'master'), errorHandler)
		done();
	}
}