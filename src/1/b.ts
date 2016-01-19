import lib = require('./lib');

export class B extends lib.A{
	name: string = "testB";
	constructor(){
		super();
		var d = new lib.D();
	}
}