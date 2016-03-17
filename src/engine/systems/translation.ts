import core = require('../core');

export class TranslationSystem extends core.System{
	type = 'translation';

	controller(component: core.Component){
		var mesh, rotationComponent, scaleComponent;

		if (mesh = component.entity.get('mesh')){
			// console.log(positionComponent.object);
			// positionComponent.object.add(component.object.position);
			try{
				mesh.object.translateX(component.object.position.x);
				mesh.object.translateY(component.object.position.y);
				mesh.object.translateZ(component.object.position.z);
			} catch (e) {
				console.log(e);
			}
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