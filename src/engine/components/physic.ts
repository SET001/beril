import core = require('../core');
import physic = require('../physic');
import components = require('../components');


export class PhysicComponent extends core.Component{
	type: string = 'physic';
	forces: physic.Force[];
	mass: number;
	speed: number;

	constructor(){
		super();
		this.dependencies = [
			components.TranslationComponent
		]
	}

	init(){
		this.object = new THREE.Vector3();
		this.mass = 0;
		this.speed = 0;
		this.forces = [];
		return true;
	}

	controller(){

	}
};