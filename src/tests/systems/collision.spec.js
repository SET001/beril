/// <reference path="definitions/definitions.d.ts" />
describe('Systems', function(){

	describe('Collision', function() {
		// var app1,	app2,	app3, foo;

		beforeEach(function(){
			beril.reset();
		});

		it('should update bounding sphere position', function(){
			var sphere = new beril.SphereMesh();
			sphere.add(beril.CollisionSphereComponent);
			sphere.init();
			sphere.get('position').object.x = 10;
			expect(sphere.get('collision').object.center.x).toBe(10);
		});

		it('should update bounding sphere position', function(){
			var sphere = new beril.BoxMesh();
			sphere.init(function(){
				this.get('position').object.x = 10;
				this.add(beril.CollisionBoxComponent);
				this.get('position').object.x = 100;
			});
			// expect(sphere.get('collision').object.center.x).toBe(10);
		});


		describe('blah', function(){
			var app, mesh1, mesh2, cs;

			beforeEach(function(done){
				app = beril.application('test', [
					beril.TranslationSystem,
					beril.CollisionSystem
				]);
				app.run(function(Cube){
					mesh1 = new beril.BoxMesh();
					mesh1.add(beril.CollisionBoxComponent);
					this.addObject(mesh1);
					
					mesh2 = new beril.BoxMesh();
					mesh2.add(beril.CollisionBoxComponent);
					this.addObject(mesh2);

					cs = this.getSystem('collision');
					Q.all([mesh1.initialised, mesh2.initialised], function(){
						done();
					});
				});
			})

			// it('should not run collision check for entities with no translation', function(){
			// 	var spy = spyOn(cs, 'checkCollision');
			// 	expect(cs.hasTranslations(mesh1)).toBeFalsy();
			// 	cs.run(app.pool);
			// 	expect(spy).not.toHaveBeenCalled();
			// });

			// it('should run collision check for entities with translation', function(){
			// 	var spy = spyOn(cs, 'checkCollision');
			// 	mesh1.get('translation').object.position.x = 100;
			// 	cs.run(app.pool);
			// 	expect(cs.hasTranslations(mesh1)).toBeTruthy();
			// 	expect(spy).toHaveBeenCalled();
			// });


		});

		// describe('CollisionSphereComponent', function(){
		// 	var mesh1, mesh2, cs;

		// 	beforeEach(function(){
		// 		mesh1 = new beril.SphereMesh();
		// 		mesh1.add(beril.CollisionSphereComponent);
		// 		mesh1.init();
		// 		mesh2 = new beril.SphereMesh();
		// 		mesh2.add(beril.CollisionSphereComponent);
		// 		mesh2.init();
		// 		cs = new beril.CollisionSystem();
		// 	});

		// 	it('collision', function(){
		// 		expect(cs.checkCollision(mesh1, mesh2)).toBeTruthy();
		// 	});

		// 	it('no collision', function(){
		// 		mesh1.get('position').object.x = 1000;
		// 		expect(cs.checkCollision(mesh1, mesh2)).toBeFalsy();
		// 	});
		// });

		// describe('CollisionBoxComponent', function(){
		// 	var mesh1, mesh2, cs;

		// 	beforeEach(function(){
		// 		mesh1 = new beril.SphereMesh();
		// 		mesh1.add(beril.CollisionBoxComponent);
		// 		mesh1.init();
		// 		mesh2 = new beril.SphereMesh();
		// 		mesh2.add(beril.CollisionBoxComponent);
		// 		mesh2.init();
		// 		cs = new beril.CollisionSystem();
		// 	});

		// 	it('collision', function(){
		// 		expect(cs.checkCollision(mesh1, mesh2)).toBeTruthy();
		// 	});

		// 	it('no collision', function(){
		// 		mesh1.get('position').object.x = 1000;
		// 		mesh1.get('collision').object.setFromObject(mesh1.get('mesh').object);
		// 		expect(cs.checkCollision(mesh1, mesh2)).toBeFalsy();
		// 	});
		// });
	});
});