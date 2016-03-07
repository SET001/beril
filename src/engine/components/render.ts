import core = require('../core');
import components = require('../components');

export class RenderComponent extends core.Component{
	type: string = 'render';
	object: THREE.Object3D;
	
	constructor(){
		super();
		this.dependencies = [
			components.MeshComponent
		];
	}
	
	init(){
		this.object = this.entity.get('mesh').object;
		return true;
	}
}