/// <reference path="definitions/definitions.d.ts" />

import injector = require('../src/di');

describe('DI', function(){
	it('asdasd', function(){
		injector.register('SomeSystem', function(){
			return {
				name: 'SomeSystem'
			}
		});
		var foo = injector.resolve(function(SomeSystem){
			expect(SomeSystem().name).toBe('SomeSystem');
		});

		foo();
	});
});
