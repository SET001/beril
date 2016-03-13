import core = require('../core');

export class TranslationSystem extends core.System{
	type = 'translation';

	controller(component: core.Component){
		var positionComponent, rotationComponent, scaleComponent;

		if (positionComponent = component.entity.get('position')){
			// console.log(positionComponent.object);
			positionComponent.object.add(component.object.position);
			// positionComponent.object.x += component.object.position.x;
			// positionComponent.object.y += component.object.position.y;
			// positionComponent.object.z += component.object.position.z;
			// var cs = _.find(this.application.systems, {type: 'collision'});
			// if (cs){
			// 	cs.controller(component.entity.get('render'));
			// }

		}
		if (rotationComponent = component.entity.get('rotation')){
			// rotationComponent.object.setFromVector3(component.object);
			rotationComponent.object.x += component.object.rotation.x;
			rotationComponent.object.y += component.object.rotation.y;
			rotationComponent.object.z += component.object.rotation.z;
		}
		if (scaleComponent = component.entity.get('scale')){
			scaleComponent.object.add(component.object.scale);
		}
		// rotationComponent.object.add(component.object.rotation);
	}
}