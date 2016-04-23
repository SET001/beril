import core = require('../core');
import components = require('../components');

export class CameraComponent extends core.Component{
	type: string = 'camera';
	object: THREE.PerspectiveCamera;

	constructor(){
		super();
		this.dependencies = [
			components.MeshComponent
		];
	}

	init(){
		this.object = new THREE.PerspectiveCamera(45, 1, 1, 100000);
		this.entity.get('mesh').object.add(this.object);
		return true;
	}
};