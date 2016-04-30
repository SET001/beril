var shadersComposer = require('../shadersComposer');

module.exports = function(gulp){
	return function(){
		return gulp.src(['src/shaders/**/[^_]*.glsl'])
			.pipe(shadersComposer('../../misc/shaders.js'))
			.pipe(gulp.dest('./'));
	}
};
