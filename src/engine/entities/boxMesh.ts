import core = require('../core');
import components = require('../components');
import {MeshObject} from './meshObject';

interface MeshConfig{
	color: number,
	radus: number,
}

export class BoxMesh extends MeshObject{
	radius: number = 1;
	color: number = 0x00ff00;

	constructor(config: MeshConfig) {
		super();
		_.assign(this, config);
	}

	setUpMesh(component){
		var geometry = new THREE.BoxGeometry(this.radius, this.radius, this.radius);
		var material = new THREE.MeshBasicMaterial({
			color: this.color,
			wireframe: true
		});
		component.object = new THREE.Mesh(geometry, material);
	}
}
