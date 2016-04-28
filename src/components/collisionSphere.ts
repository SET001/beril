/// <reference path="../definitions/definitions.d.ts" />

import core = require('../core');
import components = require('../components');

export class CollisionSphereComponent extends core.Component{
	type: string = 'collision';
	name: string = 'collisionSphere';
	
	collisions: THREE.Object3D[];
	show: Boolean = false;
	constructor(){
		super();
		this.dependencies = [
			components.PositionComponent,
			components.MeshComponent
		];
		this.collisions = [];
	}

	init(){
		this.object = this.entity.get('mesh').object.geometry.boundingSphere;
		this.object.center = this.entity.get('mesh').object.position;
		return true;
	}


};