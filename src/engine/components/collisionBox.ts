/// <reference path="../definitions/definitions.d.ts" />

import core = require('../core');
import components = require('../components');

export class CollisionBoxComponent extends core.Component{
	type: string = 'collision';
	collisions: THREE.Object3D[];
	
	constructor(){
		super();
		this.dependencies = [
			components.PositionComponent
		];
		this.collisions = [];
	}
};