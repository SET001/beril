/// <reference path="../definitions/definitions.d.ts" />

import core = require('../core');
import components = require('../components');

export class MeshComponent extends core.Component{
	type: string = 'mesh';

	constructor(){
		super();
	}

	init(){
		this.object = new THREE.Object3D();
		return true;
	}
	
};