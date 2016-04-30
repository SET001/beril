var Server = require('karma').Server;

module.exports = function(){
	return function(done){
		console.log();
		new Server({
			configFile:  __dirname + '/../tests/karma.conf.js',
			singleRun: false
		}, done).start();
	}
}