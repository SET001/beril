"use strict";

describe('ThreeRenderSystem', function(){
	var applicationMode, gameObject, pool, system;

	beforeEach(function(){
		gameObject = new Beril.GameObject([Beril.RenderComponent]);
		pool = new Beril.Pool();
		pool.add(gameObject);
		system = new Beril.ThreeRenderSystem();
		spyOn(system, 'controller');
		system.run(pool);
	});

	it("should not run if not camera set", function(){
		expect(system.controller).not.toHaveBeenCalled();
	});

	it("should not run if not scene set", function(){
		expect(system.controller).not.toHaveBeenCalled();
	});

	it("should run and render current scene if camera set", function(){
		expect(system.controller).not.toHaveBeenCalled();
	});
});
