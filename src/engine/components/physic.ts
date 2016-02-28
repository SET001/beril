import core = require('../core');

export class PhysicComponent extends core.Component{
	type: string = 'physic';
	object: THREE.Vector3 = new THREE.Vector3();
	forces: any[] = [];
	mass: number = 0;
	speed: number = 0;
};