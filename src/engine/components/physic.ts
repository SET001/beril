import core = require('../core');
import physic = require('../physic');
import components = require('../components');

export class PhysicComponent extends core.Component{
	type: string = 'physic';
	forces: physic.Force[] = [];
	mass: number = 1;
	velocity: THREE.Vector3;
	

	constructor(){
		super();
		this.dependencies = [
			components.TranslationComponent
		]
		this.velocity = new THREE.Vector3(0, 0, 0);
	}

	init(){
		this.object = new THREE.Vector3();
		return true;
	}

	controller(){

	}
};