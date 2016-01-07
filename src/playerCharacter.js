"use strict";

Beril.PlayerCharacter = class extends Beril.GameObject{
	constructor(){
		super([
			Beril.CameraComponent,
			Beril.RotationComponent,
			Beril.PositionComponent,
			Beril.ScaleComponent,
			Beril.RenderComponent,
			Beril.InputComponent,
			Beril.CollisionComponent,
			Beril.PhysicComponent,
			Beril.TranslationComponent,
		]);
		this.name = 'PlayerCharacter';
	}

	setUpCameraComponent(component){
		component.init('orthographic');
	}

	setUpInputComponent(component){
		component.controller = new Beril.FPSPlayerController();
		component.controller.component = component;
	}

	setUpRenderComponent(component){
		var material = new THREE.MeshBasicMaterial( {color: 0x01e4cc, side: THREE.DoubleSide} );
		var geometry = new THREE.SphereGeometry( 10000, 32, 32 );
		component.mesh = new THREE.Mesh(geometry, material);
		var camera = component.entity.components.camera.object;
		camera.mesh = component.mesh;
		component.mesh.add(camera);
		this.components.rotation.object = component.mesh.rotation;
		this.components.position.object = component.mesh.position;
		this.components.scale.object = component.mesh.scale;
	}

	setUpTranslationComponent(component){
		// component.rotation.x = 0.1;
		// component.rotation.y = 0.1;
		// component.rotation.z = 0.1;
	}

	setUpPhysicComponent(component){
		component.forces.push(new THREE.Vector3(0, 0.005, 0));
	}
}
