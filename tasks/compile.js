var ts = require('gulp-typescript');
var tsConfig = require('../tsconfig.json').compilerOptions;

module.exports = function(gulp, src){
	return function(){
		return gulp.src(src, { base: "." })
			.pipe(ts(tsConfig))
			.pipe(gulp.dest('.'));
	}
}