import core = require('../core');
import {ThreeRenderSystem} from './threeRender';

export class PhysiRenderSystem extends ThreeRenderSystem{
	scene: Physijs.Scene;
	constructor(){
		super();
		this.scene = new Physijs.Scene();
		this.scene.setGravity(new THREE.Vector3( 0, -30, 0 ));

		// this.scene.addEventListener(
		// 	'update', () => {
		// 		this.scene.simulate();
		// 		// physics_stats.update();
		// 	}
		// );
	}

	run(pool: core.Pool){
		if (!this.initialized) this.init();
		if (pool.components[this.type] && this.camera && this.scene){
			this.scene.simulate();
			this.renderer.render(this.scene, this.camera);
		}
	}
}