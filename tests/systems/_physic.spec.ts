/// <reference path="definitions/definitions.d.ts" />
describe('Systems', function(){

	describe('Physic', function() {
		var system,
			gravity = new beril.Force({
				vector: new THREE.Vector3(0, -1, 0),
				power: 1,
				change: 0,
			});

		beforeEach(function(){
			beril.reset();
			system = new beril.PhysicSystem();
			system.init();
		});
		
		describe('velocity and forces', function(){
			var cube, pc;
			beforeEach(function(){
				cube = new beril.BoxMesh();
				pc = cube.add(beril.PhysicComponent);
				pc.forces.push(gravity);
			});

			it('forces should change velocity', function(){
				system.controller(pc);
				system.controller(pc);
				system.controller(pc);
				system.controller(pc);
				system.controller(pc);
				expect(pc.velocity.y).toBe(-5);
			});

			it('2 forces', function(){
				pc.forces.push(new beril.Force({
					vector: new THREE.Vector3(0, 1, 0),
					power: 2,
					change: -2,
				}));
				for (var i=0; i<50; i++){
					system.controller(pc);
				}
				// system.controller(pc);
				// system.controller(pc);
				// system.controller(pc);
				// system.controller(pc);
				// expect(pc.velocity.y).toBe(-5);
				// console.log(cube.get('position').object);
			});
		});


		// it('should apply forces', function(){
		// 	// var v1 = new THREE.Vector3(2, 0, 0);
		// 	// var v2 = new THREE.Vector3(0, -9.8, 0);
		// 	// console.log(v1.add(v2));
		// 	var cube = new beril.BoxMesh();
		// 	var pc = cube.add(beril.PhysicComponent);
		// 	cube.init(function(){
		// 		this.get('translation').object.position.set(10, 10, 10);
		// 	});
		// 	pc.forces.push(system.getForce('gravity'));
		// 	system.controller(pc);

		// 	expect(pc.entity.get('translation').object.position.y).toBeLessThan(10);
		// });

		// it('should remove force when it stop acting', function(){
		// 	var cube = new beril.BoxMesh();
		// 	var pc = cube.add(beril.PhysicComponent);
		// 	var force = new beril.Force({
		// 		vector: new THREE.Vector3(1, 1, 1),
		// 		power: 1,
		// 		change: -1,
		// 	});
		// 	pc.forces.push(force);
		// 	system.controller(pc);
		// 	expect(pc.forces.length).toBe(0);
		// });

		// it('jump', function(){
		// 	var cube = new beril.BoxMesh();
		// 	var pc = cube.add(beril.PhysicComponent);
		// 	cube.init(function(){
		// 		this.get('translation').object.position.set(0, 100, 0);
		// 	});
		// 	pc.forces.push(system.getForce('gravity'));
		// 	pc.forces.push(new beril.Force({
		// 		vector: new THREE.Vector3(0, 1, 0),
		// 		power: 30,
		// 		change: -3,
		// 		name: 'jumping',
		// 	}));
		// 	// for (var i=0; i<20; i++){
		// 	// 	system.controller(pc);
		// 	// 	console.log(cube.get('translation').object.position);
		// 	// }
		// })

	});
});