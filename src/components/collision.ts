import core = require('../core');

export class CollisionComponent extends core.Component{
	type: string = 'collision';
	object: THREE.Vector3 = new THREE.Vector3();
};