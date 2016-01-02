"use strict";

define(['beril'], function(Beril){
	return class extends Beril.GameObject{
		constructor(){
			super([
				Beril.PositionComponent,
				Beril.RenderComponent,
				Beril.TranslationComponent,
			]);
		}

		setUpRenderComponent(component){
			var geometry = new THREE.BoxGeometry(2, 2, 2);
			var material = new THREE.MeshBasicMaterial({
				color: 0xffff00,
				side: THREE.DoubleSide,
				wireframe: true
			});
			component.mesh = new THREE.Mesh(geometry, material);
		}

		setUpPositionComponent(component){
			component.x = 0;
			component.y = 0;
			component.z = 0;
		}

		setUpTranslationComponent(component){
			component.rotation.x = 0.01;
			component.rotation.y = 0.01;
			component.rotation.z = 0.01;
		}
	}
});
