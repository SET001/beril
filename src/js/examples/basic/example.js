"use strict";

define(function(require){
	return function(){
		console.log("basic example");
		var Beril = require('beril'),
			application = new Beril.Application();
		application.init({
			mode: require('./mode')
		});
		application.run();
		console.log("pool", application.pool);
	}
});
