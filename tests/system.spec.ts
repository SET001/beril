/// <reference path="definitions/definitions.d.ts" />

import beril = require('../src/index');

class Lol extends beril.System{

}

class Blah extends beril.System{
	deps = [Lol];
}

class Foo extends beril.System{

}

class Bar extends beril.System{

}

describe('System', function(){
	it('should init all dependent systems', function(done){
		var app = new beril.BasicApplication([Foo, Bar]);
		app.run(function(){

			console.log("===> Foo, Bar");
			done();
		});
	});
});
