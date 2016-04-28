import beril = require('../../src/beril');

beril.BasicApplication.prototype.looper = function(avoidInfinte){
	this.animate();
}