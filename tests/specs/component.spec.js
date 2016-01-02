"use strict";
describe('Component', function(){
	it('should be createad with incremented ID', function(){
		var component = new Beril.Component();
		expect(component.id).toBeDefined();
		var component2 = new Beril.Component();
		expect(component2.id>component.id).toBe(true);
	});
});
