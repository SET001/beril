"use strict";

Beril.TranslationSystem = class extends Beril.System{
	constructor(){
		super();
		this.name = 'translation';
		this.componentTypes = ['translation'];
	}

	controller(component){
		// var renderComponent = component.entity.components.render;
		// renderComponent.mesh.position.add(component.position);
		// renderComponent.mesh.rotation.x += component.rotation.x;
		// renderComponent.mesh.rotation.y += component.rotation.y;

		var positionComponent = component.entity.components.position;
		positionComponent.object.x += component.position.x;
		positionComponent.object.y += component.position.y;
		positionComponent.object.z += component.position.z;
		var rotationComponent = component.entity.components.rotation;
		rotationComponent.object.x += component.rotation.x;
		rotationComponent.object.y += component.rotation.y;
		rotationComponent.object.z += component.rotation.z;
		// if (component.entity.components.render){
		// 	console.log(rotationComponent.object, component.entity.components.render.mesh.rotation);
		// }

		// renderComponent.mesh.rotation.z += component.rotation.z;
		// console.log();
	}
};
