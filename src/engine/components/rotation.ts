import core = require('../core');

export class RotationComponent extends core.Component{
	type = 'rotation';
	object = new THREE.Euler();
};