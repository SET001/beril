/// <reference path="definitions/_definitions.d.ts" />


import beril = require('../src/beril');

describe('application', () => {
	var
		app1:any,
		app2:any,
		app3:any,
		spy: jasmine.Spy;

	it('should run', function(){
		expect(1).toBe(1);
	});

	// beforeEach( () => {
	// 	beril.reset();
	// });

	// describe('core', function(){
	// 	it('reset should work', () => {
	// 		beril.application('asdasd', []);
	// 		app1 = beril.application('test', []);
	// 		app2 = beril.application('test2', []);
	// 		beril.reset();
	// 		app3 = beril.application('test3', []);
	// 		expect(app3.id).toBe(0);
	// 	});
	// });

	describe('application', function(){
	 	var foo = {
	 		controller: function(){}
	 	};
	 	beforeEach(function(){
	 		spy = spyOn(foo, 'controller').and.callThrough();
 			app1 = beril.application('foo', [beril.System]);
 			app2 = beril.application('bar', []);
 		});

		it('should be created with incremental ID', () => {
			expect(app1.id).not.toEqual(app2.id);
		});
	});

	// 	it('should work as application getter', function(){
	// 		var application = beril.application('foo');
	// 		expect(application.id).toEqual(app1.id);
	// 	});

	// 	it('should init systems', function(){
	// 		var system = _.find(app1.systems, {type: 'basic'});
	// 		expect(system).toBeDefined();
	// 	});

	// 	it('should run controller', function(){
	// 		app1.run(foo.controller);
	// 		expect(spy).toHaveBeenCalled();
	// 	});

	// 	it('should create defaul player character', function(){
	// 		expect(app1.pawn).toBeDefined();
	// 	});
	// });

});