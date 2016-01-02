"use strict";

describe('Pool', function(){
	var pool, entity, component;

	describe('adding', function(){
		beforeEach(function(){
			entity = new Beril.GameObject();
			pool = new Beril.Pool();
			component = new Beril.Component();

			entity.add(component);
			pool.add(entity);
		});

		it('should add components', function(){
			expect(pool.components.basic).toBeDefined();
			expect(pool.components.basic.length).toBe(1);
		});

		it('should add pointer to pool to object', function(){
			expect(entity.pool).toBeDefined();
			expect(entity.pool).toEqual(pool);
		});
	});

	describe('removing', function(){

	});
});
