/// <reference path="definitions/definitions.d.ts" />

import beril = require('./mocks/beril.mock');

fdescribe('Applications', function(){
	describe('Basic Application', function() {
		var app, sysInitSpy, appControllerSpy;

		beforeEach(function(){
			sysInitSpy = spyOn(beril.System.prototype, 'init');
		 	
			app = new beril.BasicApplication([beril.System]);
			appControllerSpy = spyOn(app, 'controller');

			app.run();
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

		// it('should work as application getter', function(){
		// 	var application = beril.application('foo');
		// 	expect(application.id).toEqual(app1.id);
		// });

		it('should init systems', function(){
			var system = _.find(app.systems, {type: 'basic'});
			expect(system).toBeDefined();
			expect(sysInitSpy).toHaveBeenCalled();
		});

		it('should run controller', function(){
			expect(appControllerSpy).toHaveBeenCalled();
		});
		// it('should run controller', function(){
		// 	app2.run(foo.controller);
		// 	expect(foo.controller).toHaveBeenCalled();
		// });
	});
});