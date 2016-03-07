import core = require('../core');
import components = require('../components');

export class RotationComponent extends core.Component{
	type = 'rotation';

	constructor(){
		super();
		this.dependencies = [
			components.MeshComponent
		];
	}

	init(){
		this.object = this.entity.get('mesh').object.rotation;
		return true;
	}
};