import core = require('../core');

export class CollisionSystem extends core.System{
	type = 'collision';

	// if object has intention for any translation
	//	apply translation to it's collision object
	//	check for collision
	//		if no collision - restore collision object
	//		if is collision - truncate translation data
	// this.updateObjectsPosition(pool.components[this.type]);
	run(pool: core.Pool){
		if (pool.components[this.type].length){
			pool.components[this.type].map((component) => {
				if (this.hasTranslations(component.entity)){
					var min = component.object.min;
					var max = component.object.max;
					this.updateCollisionObject(component, component.entity.get('translation'));
					pool.components[this.type].map( (c) => {
						if ((c.id !== component.id) && this.checkCollision(component, c)){
							if (component.entity.onCollision){
								component.entity.onCollision();
								// console.log("collision");
								component.entity.get('translation').object.position.x = 0;
								component.entity.get('translation').object.position.y = 0;
								component.entity.get('translation').object.position.z = 0;
							}
							component.object.min = min;
							component.object.max = max;
							this.resetTranslations(component.entity.get('translation'));
						}
					});
				}
			});
		}
	}

	// controller(component){
	// 	if (this.hasTranslations(component)){
	// 		this.updateCollisionObject(component);

	// 		this.checkCollision
	// 		// var tr = component.entity.get('translation');
	// 		// 	if (tr){
	// 		// 		if (!tr.object.position.equals(new THREE.Vector3(0, 0, 0))){
	// 		// 			component.object.min.add(tr.object.position);

	// 		// 		}
	// 		// 	}
	// 		// 	this.controller(component.object);
	// 	}
	// }

	resetTranslations(translations){
		// translations.object.position.set(0, 0, 0);
		// translations.object.rotation.set(0, 0, 0);
		// translations.object.scale.set(0, 0, 0);
	}

	hasTranslations(object: core.Entity){
		var tr = object.get('translation');
		if (tr){
			for(var i in tr.object){
				if (!tr.object[i].equals(new THREE.Vector3(0, 0, 0))){
					return true;
				}
			}
		}
		return false;
	}

	updateCollisionObject(component: core.Component, translation){
		if (component.name === 'collisionBox'){
			component.object.setFromPoints(component.entity.get('mesh').object.geometry.vertices);
			component.object.min.add(component.entity.get('position').object);
			component.object.max.add(component.entity.get('position').object);

			component.object.min.add(translation.object.position);
			component.object.max.add(translation.object.position);
		}
		// objects.map((component) => {
		// 	component.object.center = component.entity.get('mesh').object.position;
		// 	console.log(component.object.center, component.entity.get('mesh').object.position, component.entity.get('position').object);
		// 	// this.collidable.push(component.object);
		// });
	}

	restoreCollisionObject(component: core.Component, translation){
		if (component.name === 'collisionBox'){
			component.object.min.sub(translation.object.position);
			component.object.max.sub(translation.object.position);
		}
	}

	checkCollision(object1: core.Component, object2: core.Component){
		if (object1.name == object2.name){
			switch (object1.name) {
				case 'collisionSphere':
					return object1.object.intersectsSphere(object2.object);
				case 'collisionBox':
					return object1.object.intersectsBox(object2.object);
			}
		} else {

		}
		return false;
	}

	// controller(object){
		// this.collidable.map((boundingObject) => {
		// 	console.log("====>", boundingObject.center, object.center);
		// 	var collision = boundingObject.intersectsSphere(object);
		// 	console.log(collision);
		// });
		// var vector1 = new THREE.Vector3();
		// // // vector1.setFromMatrixPosition( component.object.matrixWorld );

		// var collisionComponents = this.pool.components['collision'];
		// component.object.updateMatrixWorld( true );
		// component.object.geometry.computeBoundingSphere();
		// var bs = component.object.geometry.boundingSphere.clone();
		// bs.center.setFromMatrixPosition(component.object.matrixWorld);
		// if (collisionComponents.length){
		// 	for(var i in collisionComponents){
		// 		var c = collisionComponents[i];
		// 		if (component.entity.id !== c.entity.id){
		// 			var _bs = c.entity.get('render').object.geometry.boundingSphere.clone();
		// 			_bs.center.setFromMatrixPosition(c.entity.get('render').object.matrixWorld);
		// 			var intersects = _bs.intersectsSphere(bs);
		// 			// if(intersects){
		// 			// 	if (component.entity.onCollision)
		// 			// 		component.entity.onCollision(intersects);
		// 			// 	// console.log("collision! ", component.entity.id, " with ", c.entity.id, " : ", bs.center);
		// 			// }
		// 		}
		// 	}
		// }
	// }
}
				// console.log(c.entity.get('render').object.geometry, c.entity.get('render').object.geometry.radius, c.entity.get('render').object.radius);
				// if (component.entity.id !== c.entity.id){
				// 	var vector = new THREE.Vector3();
				// 	vector.setFromMatrixPosition( c.object.matrixWorld );
				// 	var distance = Math.abs(vector.x - component.object.x);
				// 	if (distance<2){
				// 		console.log("collision!", distance);
				// 	}
				// }