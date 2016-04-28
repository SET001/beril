/// <reference path="../definitions/definitions.d.ts" />
import beril = require('../../src/beril');

describe('Entities', function(){

	describe('MeshObject', function() {
		var meshObject;

		beforeEach(function(){
			meshObject = new beril.SphereMesh();
			meshObject.init();
		});


		it('Should have components', function(){
			expect(meshObject.get('mesh')).toBeDefined();
			expect(meshObject.get('position')).toBeDefined();
			expect(meshObject.get('scale')).toBeDefined();
			expect(meshObject.get('rotation')).toBeDefined();
		});

		it('changes in position component should reflect on mesh.position', function(){
			meshObject.get('position').object.x = 10;
			expect(meshObject.get('mesh').object.position.x).toBe(10);
		});

	});
});