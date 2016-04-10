import core = require('../core');
import {ThreeRenderSystem} from './threeRender';

export class PhisiRenderSystem extends ThreeRenderSystem{
	scene: Physijs.Scene;
	constructor(){
		super();
		this.scene = new Physijs.Scene();
		this.scene.setGravity(new THREE.Vector3( 0, -30, 0 ));

		this.scene.addEventListener(
			'update', () => {
				this.scene.simulate( undefined, 1 );
				// physics_stats.update();
			}
		);
	}
}