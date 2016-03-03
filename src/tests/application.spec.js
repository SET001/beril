/// <reference path="definitions/definitions.d.ts" />
describe('application', function() {
	var app1,	app2,	app3, foo;

	beforeEach(function(){
		beril.reset();

		foo = {
	 		controller: function(){}
	 	};
		spyOn(foo, 'controller').and.callThrough();
	 	
		app1 = beril.application('foo', [beril.System]);
 		app2 = beril.application('bar', []);
	});

	// it('should run', function(){
	// 	var app = beril.application('asdasd', []);
	// 	expect(1).toBe(1);
	// });

	// fit('should resolve empty promisses array', function(){
	// 	Q.all([]).then(
	// 		foo.controller,
	// 		foo.controller
	// 	);
	// 	expect(foo.controller).toHaveBeenCalled();
	// });

	it('basic application foo to be run once', function(){
		// app1.foo();	// test for beril mock
	});

	it('should be created with incremental ID', function() {
		expect(app1.id).not.toEqual(app2.id);
	});

	it('should reset engine settings', function() {
		beril.reset();
		app3 = beril.application('test3', []);
		expect(app3.id).toBe(0);
	});

	it('should work as application getter', function(){
		var application = beril.application('foo');
		expect(application.id).toEqual(app1.id);
	});

	it('should init systems', function(){
		var system = _.find(app1.systems, {type: 'basic'});
		expect(system).toBeDefined();
	});

	it('should run controller', function(){
		app2.run(foo.controller);
		expect(foo.controller).toHaveBeenCalled();
	});
});