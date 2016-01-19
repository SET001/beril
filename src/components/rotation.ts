import core = require('../core');

export class RotationComponent extends core.Component{
	type: string = 'rotation';
	object: THREE.Euler = new THREE.Euler();
};