"use strict";

Beril.TranslationSystem = class extends Beril.System{
	constructor(){
		super();
		this.name = 'translation';
		this.componentTypes = ['translation'];
	}

	controller(component){
		var renderComponent = component.entity.components.render;
		renderComponent.mesh.position.add(component.position);
		renderComponent.mesh.rotation.x += component.rotation.x;
		renderComponent.mesh.rotation.y += component.rotation.y;
		// renderComponent.mesh.rotation.z += component.rotation.z;
		// console.log();
	}
};
