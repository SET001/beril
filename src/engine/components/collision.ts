import core = require('../core');

export class CollisionComponent extends core.Component{
	type: string = 'collision';
	collisions: THREE.Object3D[] = [];
	constructor(){
		super();
	}

	
};