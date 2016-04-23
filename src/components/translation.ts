import core = require('../core');
import components = require('../components');

interface TranslationObject{
	position: THREE.Vector3;
	scale: THREE.Vector3;
	rotation: THREE.Vector3;
}

export class TranslationComponent extends core.Component{
	type: string = 'translation';
	object: TranslationObject;

	constructor(){
		super();
		this.dependencies = [
			components.PositionComponent,
			components.RotationComponent,
			components.ScaleComponent
		];

		this.object = {
			position: new THREE.Vector3(),
			scale: new THREE.Vector3(),
			rotation: new THREE.Vector3()
		};
	}
};