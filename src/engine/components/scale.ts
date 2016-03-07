import core = require('../core');
import components = require('../components');

export class ScaleComponent extends core.Component{
	type = 'scale';

	constructor(){
		super();
		this.dependencies = [
			components.MeshComponent
		];
	}

	init(){
		this.object = this.entity.get('mesh').object.scale;
		return true;
	}
};