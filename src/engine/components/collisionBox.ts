/// <reference path="../definitions/definitions.d.ts" />

import core = require('../core');
import components = require('../components');

export class CollisionBoxComponent extends core.Component{
	type: string = 'collision';
	name: string = 'collisionBox';

	collisions: THREE.Object3D[];
	show: Boolean = false;
	constructor(){
		super();
		this.dependencies = [
			components.PositionComponent
		];
		this.collisions = [];
	}

	init(){
		this.object = new THREE.Box3();
		this.entity.get('mesh').object.geometry.computeBoundingBox();
		this.object.setFromObject(this.entity.get('mesh').object);
		return true;
	}
};