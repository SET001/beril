"use strict";

Beril.TestSystem = class extends Beril.System{
	constructor(){
		super();
		this.name = 'test';
		this.componentTypes.push('basic');
	}

	controller(component){
		component.lol = 9485456;
	}
};

describe('System', function(){
	var applicationMode, gameObject, pool, system;

	beforeEach(function(){
		gameObject = new Beril.GameObject([Beril.Component]);
		pool = new Beril.Pool();
		system = new Beril.System();

		spyOn(system, 'controller');
		spyOn(system, 'onComponentAdded');
		spyOn(system, 'onComponentRemoved');
	});

	describe('controller', function(){
		beforeEach(function(){
			pool.add(gameObject);
			system.run(pool);
		});

		it("should iterate pool", function(){
			expect(system.controller).toHaveBeenCalled();
		});
	});

	describe('subscriptions', function(){
		beforeEach(function(){
			system.subscribeToPool(pool);
			pool.add(gameObject);
		});

		it('onComponentAdded', function(){
			expect(system.onComponentAdded).toHaveBeenCalled();
		});

		it('onComponentRemoved', function(){
			expect(system.onComponentRemoved).toHaveBeenCalled();
		});
	});

	describe('component updates', function(){

	});
});
