var git = require('gulp-git');
var util = require('gulp-util');

var errorHandler = function(error){
	if (error) console.error(error);
}

module.exports = function(gulp){
	return function(done){
		gulp.src("./")
			.pipe(git.commit("Updated to version " + util.env.version, {args: "--all"}), errorHandler)
			.on('end', function(){
				git.checkout('master', errorHandler);
				git.merge('dev', function(error){
					if (error) errorHandler(error)
					else {
						git.push('origin', 'master', function(){
							if (error) errorHandler(error)
							else{
								git.checkout('dev', errorHandler);
							}
						});
					}
				});
			});
		done();
	}
}
