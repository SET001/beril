/// <reference path="definitions/definitions.d.ts" />
describe('application', function() {
	var 
		app1,
		app2,
		app3;

	beforeEach(function(){
		app1 = beril.application("testApp", []);
		app2 = beril.application("testApp", []);
	});

	// it('should run', function(){
	// 	var app = beril.application('asdasd', []);
	// 	expect(1).toBe(1);
	// });

	it('should be created with incremental ID', function() {
		expect(app1.id).not.toEqual(app2.id);
	});

	it('should reset engine settings', function() {
		beril.reset();
		app3 = beril.application('test3', []);
		expect(app3.id).toBe(0);
	});
});