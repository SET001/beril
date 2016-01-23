import core = require('./core');
import {FPSPlayerController} from './playerControllers/fps';
import components = require('./components');

export class Player extends core.Entity{

	constructor(){

		super('Player', [
			components.CameraComponent,
			components.RotationComponent,
			components.PositionComponent,
			components.ScaleComponent,
			components.RenderComponent,
			components.InputComponent,
			components.CollisionComponent,
			components.PhysicComponent,
			components.TranslationComponent,
		]);
	}

	setUpCamera(component){
		component.object.position.z = 10;
	}

	setUpInput(component){
		component.controller = new FPSPlayerController();
		component.controller.component = component;
	}

	setUpRender(component){
		var material = new THREE.MeshBasicMaterial( {color: 0x01e4cc, side: THREE.DoubleSide} );
		var geometry = new THREE.SphereGeometry( 10000, 32, 32 );
		component.object = new THREE.Object3D();
		// var camera = component.entity.get('camera').object;
		// camera.object = component.object;
		// component.object.add(camera);
		// this.components.rotation.object = component.mesh.rotation;
		// this.components.position.object = component.mesh.position;
		// this.components.scale.object = component.mesh.scale;
	}

	setUpTranslation(component){
		// component.rotation.x = 0.1;
		// component.rotation.y = 0.1;
		// component.rotation.z = 0.1;
	}

	setUpPhysic(component){
		component.forces.push(new THREE.Vector3(0, 0.005, 0));
	}
}
