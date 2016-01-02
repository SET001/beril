"use strict";

define(function(require){
	return function(){
		var Beril = require('beril'),
		application = new Beril.Application();
		application.init({mode: require('./mode')});
		application.run();
	}
});
