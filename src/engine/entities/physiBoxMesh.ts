import core = require('../core');
import components = require('../components');
import {MeshObject} from './meshObject';

interface MeshConfig{
	color: number,
	radus: number,
}

export class PhysiBoxMesh extends MeshObject{
	radius: number = 1;
	color: number = 0x00ff00;
	mass: number = 1;

	constructor(config: MeshConfig) {
		super();
		_.assign(this, config);
	}

	// controller(){
	// 	this.get('mesh').object.setAngularVelocity(new THREE.Vector3(0, 0, 0));
	// 	// this.get('mesh').object.__dirtyRotation = true;
	// 	this.get('mesh').object.rotation.x=0;
	// 	this.get('mesh').object.rotation.y=0;
	// 	this.get('mesh').object.rotation.z=0;
	// 	this.get('mesh').object.__dirtyRotation = true;
	// }

	setUpMesh(component){
		var box_geometry = new THREE.CubeGeometry( 1, 1, 1 );
		var material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ color: 0xffffff}),
			1, // friction
			0 // low restitution
		);
		// material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
		// material.map.repeat.set( .5, .5 );
		
		//material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/rocks.jpg' ) });
		
		var box = new Physijs.BoxMesh(
			box_geometry,
			material, this.mass
		);
		box.castShadow = true;

		// box.setLinearVelocity(new THREE.Vector3(0, 0, 0));
  //   box.setAngularVelocity(new THREE.Vector3(0, 0, 0));
		// box.setCcdMotionThreshold(0.0001);

		component.object = box;
		// box.addEventListener("ready", function(){
  //  		box.setAngularFactor(new THREE.Vector3(0, 0, 0));
		// });

		// box.addEventListener('collision', function(a, b, c, d){
		// 	// console.log(a, b, c, d);
		// 	// // // box.mass = 100;
		// 	// box.rotation.x=0;
		// 	// box.rotation.y=0;
		// 	// box.rotation.z=0;
		// 	// box.setLinearVelocity(new THREE.Vector3(0, 0, 0));
  //  		box.setAngularVelocity(new THREE.Vector3(0, 0, 0));
  //  		box.setLinearVelocity(new THREE.Vector3(0, 0, 0));
		// 	// box.__dirtyRotation = true;
		// })
	}
}
