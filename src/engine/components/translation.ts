import core = require('../core');

interface TranslationObject{
	position: THREE.Vector3;
	scale: THREE.Vector3;
	rotation: THREE.Vector3;
}

export class TranslationComponent extends core.Component{
	type: string = 'translation';
	object: TranslationObject = {
		position: new THREE.Vector3(),
		scale: new THREE.Vector3(),
		rotation: new THREE.Vector3()
	};
};