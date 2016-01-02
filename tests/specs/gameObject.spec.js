"use strict";

describe('GameObject', function(){
	var entity, component, pool;

	it('should create entity without components', function(){
		var entity = new Beril.GameObject();
		expect(entity).toBeDefined();
	});

	describe('constructor', function(){
		it('Should create components on creation', function(){
			var foo = new Beril.GameObject([Beril.Component]);
			expect(foo.components.basic).toBeDefined();
			expect(foo.components.basic instanceof Beril.Component).toBe(true);
		});

		it('should run components setups', function(){
			var TestGameObject = class extends Beril.GameObject{
				constructor(){super([Beril.RenderComponent])}
				setUpRenderComponent(){}
			}
			var spy = spyOn(TestGameObject.prototype, 'setUpRenderComponent');
			new TestGameObject();
			expect(spy).toHaveBeenCalled()
		});
	})

	describe('components adding', function(){
		beforeEach(function(){
			entity = new Beril.GameObject();
			component = new Beril.Component();
			pool = new Beril.Pool();
			entity.add(component);
			pool.add(entity);
		});

		it('Should be able to add component', function(){
			expect(entity.components.basic).toBeDefined();
			expect(entity.components.basic instanceof Beril.Component).toBe(true);
		});

		it('added component should have pointer to its entity', function(){
			expect(component.entity).toBeDefined();
			expect(component.entity).toEqual(entity);
		});

		it('added component should appear in pool if object attached to it', function(){
			var component2 = new Beril.Component();
			entity.add(component);
			expect(pool.components.basic.length).toBe(2);
		});
	});

	describe('components removing', function(){
		beforeEach(function(){
			entity = new Beril.GameObject();
			component = new Beril.Component();
			pool = new Beril.Pool();
			entity.add(component);
			pool.add(entity);
			entity.remove('basic');
		});

		it('Should be able to remove component', function(){
			expect(entity.components.length).toBe(0);
		});

		it('Should also remove component from pool', function(){
			expect(pool.components.basic.length).toBe(0);
		});

	});
});
