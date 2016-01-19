/// <reference path="definitions/_definitions.d.ts" />

import beril = require('src/beril');

describe('Component', function(){
	it('should be createad with incremented ID', function(){
		var component = new beril.Component();
		expect(component.id).toBeDefined();
		var component2 = new beril.Component();
		expect(component2.id>component.id).toBe(true);
	});
});
