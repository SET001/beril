import core = require('../core');

export class TranslationSystem extends core.System{
	type = 'translation';

	controller(component: core.Component){
		// var positionComponent = component.entity.get('position');
		// positionComponent.object.x += component.object.position.x;
		// positionComponent.object.y += component.object.position.y;
		// positionComponent.object.z += component.object.position.z;
		var rotationComponent = component.entity.get('rotation');
		rotationComponent.object.x += component.object.rotation.x;
		rotationComponent.object.y += component.object.rotation.y;
		rotationComponent.object.z += component.object.rotation.z;
	}
}