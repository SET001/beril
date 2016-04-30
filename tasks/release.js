var git = require('gulp-git');

module.exports = function(gulp){
	return function(done){
		git.checkout('master');
		git.merge('dev');
		git.checkout('dev');
		git.push('origin', 'master');
		done();
	}
}