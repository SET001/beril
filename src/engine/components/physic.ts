import core = require('../core');

export class PhysicComponent extends core.Component{
	type: string = 'physic';
	object: THREE.Vector3;
	forces: any[];
	mass: number;
	speed: number;

	init(){
		this.object = new THREE.Vector3();
		this.mass = 0;
		this.speed = 0;
		this.forces = [];
		return true;
	}
};