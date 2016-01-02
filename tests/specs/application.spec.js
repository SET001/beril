"use strict";

describe('Application', function(){
	var application;

	describe('creation', function(){
		beforeEach(function(){
			application = new Beril.Application();
		});

		it('should be createad', function(){
			expect(typeof application).toBe('object');
		});

		describe('initialisation', function(){
			// beforeEach(function(){
			// 	application.init();
			// });

			it('should be initialized with default mode', function(){
				application.init();
				expect(application.mode instanceof Beril.DefaultApplicationMode).toBe(true);
			});

			it('should be initialized with manual mode', function(){
				var TestMode = class extends Beril.DefaultApplicationMode{constructor(){super()}};
				application.init({mode: TestMode});
				expect(application.mode).toBeDefined();
				expect(typeof application.mode).toBe('object');
				expect(application.mode instanceof TestMode).toBe(true);
			});

			it('should put a reference to application object to appMode on creation', function(){
				application.init();
				expect(application.mode.application).toBeDefined();
			})
		})
	});

	it ('should change mode', function(){

	});
});
