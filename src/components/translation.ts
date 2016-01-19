import core = require('../core');

export class TranslationComponent extends core.Component{
	type: string = 'translation';
	position: THREE.Vector3 = new THREE.Vector3();
	scale: THREE.Vector3 = new THREE.Vector3();
	rotation: THREE.Vector3 = new THREE.Vector3();
};