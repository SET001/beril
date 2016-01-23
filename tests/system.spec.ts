/// <reference path="definitions/_definitions.d.ts" />

import beril = require('src/beril');

class Lol extends beril.System{

}

class Blah extends beril.System{
	deps = [Lol];
}

class Foo extends beril.System{

}

class Bar extends beril.System{

}

fdescribe('System', function(){
	it('should init all dependent systems', function(){
		beril.application('test', [beril.ThreeRenderSystem])
		.system('Bar', Bar)
		.system('Foo', Foo)
		.run(function(Foo:beril.System, Bar:beril.System){
			console.log("===> Foo, Bar", Foo.initialized, Bar.initialized);
		});
	});
});
