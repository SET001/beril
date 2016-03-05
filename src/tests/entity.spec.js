/// <reference path="definitions/definitions.d.ts" />

describe('Entity', function(){
	var entity, component, pool;

	it('should create entity', function(){
		var entity = new beril.Entity('test', []);
		expect(entity).toBeDefined();
	});

	describe('constructor', function(){
		
		it('should run components setups', function(){
			var TestEntity = function(){}
			TestEntity.prototype = new beril.Entity();
			TestEntity.prototype.setUpBasic = function(){};
			var entity = new TestEntity();
			var spy = spyOn(TestEntity.prototype, 'setUpBasic');
			entity.add(beril.Component);
			expect(spy).toHaveBeenCalled()
		});
	})

	describe('components adding', function(){
		beforeEach(function(){
			entity = new beril.Entity('test', []);
			// component = new beril.Component();
			pool = new beril.Pool();
		});

		it('Should be able to add component', function(){
			entity.add(beril.Component);
			expect(entity.get('basic')).toBeDefined();
			expect(entity.get('basic') instanceof beril.Component).toBe(true);
		});

		it('added component should have pointer to its entity', function(){
			var component = entity.add(beril.Component);
			expect(component.entity).toBeDefined();
			expect(component.entity).toEqual(entity);
		});

		it('added component should appear in pool if object attached to it', function(){
			pool.add(entity);
			entity.add(beril.Component);
			expect(pool.components.basic).toBeDefined();
			expect(pool.components.basic.length).toBe(1);
		});

		it('should run component`s init function', function(){
			spyOn(beril.Component.prototype, 'init');
			entity.add(beril.Component);
			expect(beril.Component.prototype.init).toHaveBeenCalled();
		});

		it('should not add component which initializaion failed', function(){
			var TestComponent = function(){
				this.type = 'test';
			};
			TestComponent.prototype = new beril.Component();
			TestComponent.prototype.init = function(){return false};
			entity.add(TestComponent);
			expect(entity.get('test')).toBeFalsy();
		});

		describe('components dependencies', function(){

			it('should init components from dependencies list', function(){
				var TestComponent = function(){
					this.type = 'test';
					this.dependencies = [beril.Component];
				};
				TestComponent.prototype = new beril.Component();
				entity.add(TestComponent);

				expect(entity.get('test')).toBeDefined();
				expect(entity.get('basic')).toBeDefined();
				expect(entity.depChain.length).toBe(0);
			});

			it('should find circular dependencies', function(){
				var FooComponent = function(){
					this.type = 'foo';
					this.dependencies = [BarComponent];
				};
				FooComponent.prototype = new beril.Component();

				var BarComponent = function(){
					this.type = 'bar';
					this.dependencies = [FooComponent];
				};
				BarComponent.prototype = new beril.Component();
				var blah = function(){
					entity.add(BarComponent);
				}
				expect(blah).toThrow();
				expect(entity.depChain.length).toBe(0);
			});

			it('should fail adding component if its dependent initialization fails', function(){
				var FooComponent = function(){
					this.type = 'foo';
				};
				FooComponent.prototype = new beril.Component();
				FooComponent.prototype.init = function(){return false};

				var BarComponent = function(){
					this.type = 'bar';
					this.dependencies = [FooComponent];
				};
				BarComponent.prototype = new beril.Component();

				var blah = function(){
					entity.add(BarComponent);
				}
				expect(blah).toThrow();
				expect(entity.depChain.length).toBe(0);
			});
		});
	});

	describe('components removing', function(){
		beforeEach(function(){
			entity = new beril.Entity('test', []);
			pool = new beril.Pool();
			entity.add(beril.Component);
			pool.add(entity);
			entity.remove('basic');
		});

		it('Should be able to remove component', function(){
			expect(entity.components.length).toBe(0);
		});

		it('Should also remove component from pool', function(){
			expect(pool.components.basic.length).toBe(0);
		});

		it('Should remove all dependant components', function(){
			var TestComponent = function(){
				this.type = 'test';
				this.dependencies = [beril.Component];
			};
			TestComponent.prototype = new beril.Component();
			entity.add(TestComponent);
			entity.remove('basic');
			expect(entity.components.length).toBe(0);
		});

	});
});
