/// <reference path="definitions/definitions.d.ts" />

describe('Component', function(){
	it('should be createad with incremented ID', function(){
		var component = new beril.Component();
		expect(component.id).toBeDefined();
		var component2 = new beril.Component();
		expect(component2.id>component.id).toBe(true);
	});

	it('should wait dependencies', function(){

	});
});
