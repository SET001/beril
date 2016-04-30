var requirejs = require('requirejs');
var fs = require('fs');

module.exports = function(){
	return function(done){
		var config = {
			baseUrl: './src/',
			name: 'index',
			include: ['../misc/shaders.js', '../misc/three_patch.js'],
			out: './build/beril.js'
		};

		requirejs.optimize(config, function (buildResponse) {
			done();
		}, function(err) {
			console.log(err);
			done();
		});
	}
}