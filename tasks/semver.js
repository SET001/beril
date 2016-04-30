var fs = require('fs');
var semver = require('semver');
var util = require('gulp-util');

module.exports = function(){
	return function(done){
		var type =  'patch';
		if (util.env.major && util.env.minor ){

		} else {
			if (util.env.major) type = 'major';
			if (util.env.minor) type = 'minor';
		}
		var packageConfig =  require('../package.json');
		packageConfig.version = semver.inc(packageConfig.version, type);
		fs.writeFile('./package.json', JSON.stringify(packageConfig, null, 2));
		fs.writeFile('./src/version.ts', `export var version: string = '${packageConfig.version}';`);
		util.env.version = packageConfig.version;
		done();
	};
}