import core = require('../core');

export class CollisionSystem extends core.System{
	type = 'collision';

	run(){}

	controller(component){
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
	}
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