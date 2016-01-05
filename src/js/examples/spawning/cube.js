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
			var distance = 1000
			component.mesh.position.x = Math.random()*distance-distance/2;
			component.mesh.position.y = Math.random()*distance-distance/2;
			component.mesh.position.z = Math.random()*distance-distance/2;
			// component.mesh.position.y = Math.random()*10;
			// component.mesh.position.z = Math.random()*10;
			this.components.rotation.object = component.mesh.rotation;
			this.components.position.object = component.mesh.position;
			this.components.scale.object = component.mesh.scale;
		}

		setUpTranslationComponent(component){
			component.rotation.x = Math.random()*0.05;

			component.position.x = Math.random()*0.1;
			// component.rotation.y = 0.01;
			// component.rotation.z = 0.01;
		}
	}
});
