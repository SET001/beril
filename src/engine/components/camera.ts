import core = require('../core');

export class CameraComponent extends core.Component{
	type: string = 'camera';
	object: THREE.PerspectiveCamera;

	constructor(){
		super();
	}

	init(){
		this.object = new THREE.PerspectiveCamera(45, 1, 1, 100000);
		return true;
	}
};