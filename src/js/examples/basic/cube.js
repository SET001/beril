"use strict";

define(['beril'], function(Beril){
	return class extends Beril.GameObject{
		constructor(){
			super([
				Beril.RotationComponent,
				Beril.PositionComponent,
				Beril.ScaleComponent,
				Beril.RenderComponent,
				Beril.TranslationComponent,
			]);
			this.name = "Cube";
		}

		setUpRenderComponent(component){
			var geometry = new THREE.BoxGeometry(2, 2, 2);
			var material = new THREE.MeshBasicMaterial({
				color: 0xffff00,
				side: THREE.DoubleSide,
				wireframe: true
			});
			component.mesh = new THREE.Mesh(geometry, material);
			this.components.rotation.object = component.mesh.rotation;
			component.mesh.position.set(
				this.components.position.object.x,
				this.components.position.object.y,
				this.components.position.object.z);
			this.components.position.object = component.mesh.position;
			this.components.scale.object = component.mesh.scale;
		}

		setUpTranslationComponent(component){
			component.rotation.x = 0.01;
		}

		setUpPositionComponent(component){
			component.object.z = -10;
			// component.object.y = -1000;
			// component.object.x = -1000;
		}
	}
});