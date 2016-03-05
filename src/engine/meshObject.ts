import core = require('./core');
import components = require('./components');

export class MeshObject extends core.Entity{

	constructor(){
		super('MeshObject', [
			components.RotationComponent,
			components.PositionComponent,
			components.ScaleComponent,
			components.RenderComponent,
			components.TranslationComponent,
			components.CollisionComponent
		]);
	}

	setUpComponents(){
		super.setUpComponents();
		var renderComponent = this.get('render');
		var comps = ['position', 'rotation', 'scale'];
		for (var i in comps){
			var component = this.get(comps[i]);
			if (component){
				component.object = renderComponent.object[comps[i]];
			}
		}
	}

	setUpCollision(component){
		// var geometry = new THREE.SphereGeometry(1, 10, 10);
		// var material = new THREE.MeshBasicMaterial({
		// 	color: 0x0000ff,
		// 	wireframe: true
		// });
		// // component.object = new THREE.Mesh(geometry, material);
		
		// // component.blah = new THREE.Math.Sphere(1, material);
		// component.entity.get('render').object.add(component.object);
	}
}
