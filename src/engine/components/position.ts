import core = require('../core');

export class PositionComponent extends core.Component{
	type = 'position';
	object: THREE.Vector3 = new THREE.Vector3();
};