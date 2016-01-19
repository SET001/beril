import core = require('../core');

class ThreeRenderSystem extends core.System{
	type = 'render';
	container: HTMLElement;
	pool: core.Pool;
	renderer: THREE.WebGLRenderer;
	scene: THREE.Scene;
	camera: THREE.PerspectiveCamera;
	initialized: boolean;

	constructor(){
		super();
		this.container = document.body;
		this.renderer = new THREE.WebGLRenderer();
		this.scene = new THREE.Scene();
	}
	
	init(){
		this.container.appendChild(this.renderer.domElement);
		window.addEventListener('resize', () => this.setSize());
		this.setSize();
		this.initialized = true;
	}

	controller(component: core.Component){}

	run(pool: core.Pool){
		if (!this.initialized) this.init();
		if (pool.components[this.type] && this.camera && this.scene){
			this.renderer.render(this.scene, this.camera);
		}
	}

	setSize(){
		this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
		if (this.camera){
			this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
			this.camera.updateProjectionMatrix();
		}
	}

	setCamera(camera){
		this.camera = camera;
	}

	onComponentAdded(component: core.Component){

		this.scene.add(component.object);
		console.log("added component to scene ", component, this.scene);
	}

	onComponentRemoved(component: core.Component){
		this.scene.remove(component.object);
	}
}
export = ThreeRenderSystem;