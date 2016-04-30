import beril = require('../../src/index');

beril.BasicApplication.prototype.looper = function(){
	this.animate();
}