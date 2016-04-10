import core = require('../core');
import components = require('../components');
import {MeshObject} from './meshObject';

interface MeshConfig{
	color: number,
	radus: number,
}

export class PhisiBoxMesh extends MeshObject{
	radius: number = 1;
	color: number = 0x00ff00;

	constructor(config: MeshConfig) {
		super();
		_.assign(this, config);
	}

	setUpMesh(component){
		var box_geometry = new THREE.CubeGeometry( 4, 4, 4 );
		var material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ color: 0xffffff}),
			0, // medium friction
			0 // low restitution
		);
		// material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
		// material.map.repeat.set( .5, .5 );
		
		//material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/rocks.jpg' ) });
		
		var box = new Physijs.BoxMesh(
			box_geometry,
			material
		);
		box.castShadow = true;

		box.position.set(0, 25, 0);

		component.object = box;
		box.addEventListener('collision', function(a, b, c, d){
			console.log(a, b, c, d);
		})
	}
}
