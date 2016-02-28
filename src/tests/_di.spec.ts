/// <reference path="definitions/definitions.d.ts" />

import injector = require('src/di');

fdescribe('DI', function(){
	it('asdasd', function(){
		injector.register('SomeSystem', function(){
			return {
				name: 'SomeSystem'
			}
		});
		var foo = injector.resolve(function(SomeSystem){
			console.log("===>", SomeSystem);
			expect(SomeSystem().name).toBe('SomeSystem');
		});

		foo();
	});
});
