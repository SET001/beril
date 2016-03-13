import core = require('../core');
import components = require('../components');
import {MeshObject} from './meshObject';

export class SphereMesh extends MeshObject{
	radius: number = 1;

	constructor() { super(); }

	setUpMesh(component){
		var geometry = new THREE.SphereGeometry(this.radius, 10, 10);
		var material = new THREE.MeshBasicMaterial({
			color: 0x0000ff,
			wireframe: true
		});
		component.object = new THREE.Mesh(geometry, material);
	}

	// setUpCollision(component){
	// 	// var geometry = new THREE.SphereGeometry(1, 10, 10);
	// 	// var material = new THREE.MeshBasicMaterial({
	// 	// 	color: 0x0000ff,
	// 	// 	wireframe: true
	// 	// });
	// 	// // component.object = new THREE.Mesh(geometry, material);
		
	// 	// // component.blah = new THREE.Math.Sphere(1, material);
	// 	// component.entity.get('render').object.add(component.object);
	// }
}
