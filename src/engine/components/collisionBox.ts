/// <reference path="../definitions/definitions.d.ts" />

import core = require('../core');
import components = require('../components');

enum CollisionTypes{
	BLOCK,
	OVERLAP
}

export class CollisionBoxComponent extends core.Component{
	type: string = 'collision';
	name: string = 'collisionBox';
	collisionType: CollisionTypes = CollisionTypes.BLOCK;

	collisions: THREE.Object3D[];
	// show: Boolean = false;
	constructor(){
		super();
		this.dependencies = [
			components.PositionComponent
		];
		this.collisions = [];
	}

	init(){
		this.object = new THREE.Box3();
		// this.entity.get('mesh').object.geometry.computeBoundingBox();
		this.object.setFromObject(this.entity.get('mesh').object);
		return true;
	}

	show(){
		var bbox = new THREE.BoundingBoxHelper( this.entity.get('mesh').object, 0x888888 );
		bbox.update();
		console.log(bbox);
		this.entity.get('mesh').object.add(bbox);
	}
};