import core = require('../core');
import {ThreeRenderSystem} from './threeRender';

export class PhysiRenderSystem extends ThreeRenderSystem{
	scene: Physijs.Scene;
	constructor(){
		super();
		this.scene = new Physijs.Scene();
		this.scene.setGravity(new THREE.Vector3( 0, -30, 0 ));

		this.scene.addEventListener('update', () => {
			this.scene.simulate();
			// physics_stats.update();
		});
	}

	run(pool: core.Pool){
		// this.scene.simulate(undefined, 1);
		this.renderer.render(this.scene, this.camera);
	}
}