import core = require('../core');
import components = require('../components');

export class PositionComponent extends core.Component{
	type = 'position';
	object: THREE.Vector3;

	constructor(){
		super();
		this.dependencies = [
			components.MeshComponent
		];
	}

	init(){
		this.object = this.entity.get('mesh').object.position;
		return true;
	}
};