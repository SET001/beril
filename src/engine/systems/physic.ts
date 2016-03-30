import core = require('../core');
import components = require('../components');
import physic = require('../physic');

export class PhysicSystem extends core.System{
	type = 'physic';
	forces = [
		new physic.Force({
			name: 'gravity',
			vector: new THREE.Vector3(0, -1, 0),
			power: 9.8,
			change: 0,
		})
	];

	controller(component: components.PhysicComponent){
		var pt = component.entity.get('translation');

		if (component && component.forces){
			for(var i in component.forces){
				var force = component.forces[i];
				var v = force.vector.clone().multiplyScalar(force.power);
				pt.object.position.add(v);
				force.power += force.change;
				if (force.power <= 0){
					component.forces.splice(i, 1);
				}
			}
		}
	}

	getForce(forceName: string){
		return _.find(this.forces, {name: forceName});
	}
}