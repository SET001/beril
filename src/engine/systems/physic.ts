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
		var v;
		if (component && component.forces){
			for(var i in component.forces){
				var force = component.forces[i];
				v = force.vector.clone().multiplyScalar(force.power);
				component.velocity.add(v);

				// 	// pt.object.position.add(v);
				force.power += force.change;
				if (force.power <= 0){
					component.forces.splice(i, 1);
				}
			}
		}
		component.entity.get('translation').object.position.add(component.velocity);
	}

	getForce(forceName: string){
		return _.find(this.forces, {name: forceName});
	}
}