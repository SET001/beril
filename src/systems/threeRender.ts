import core = require('../core');

export class ThreeRenderSystem extends core.System{
	type = 'render';
	container: HTMLElement;
	pool: core.Pool;
	renderer: THREE.WebGLRenderer;
	scene: THREE.Scene;
	camera: THREE.PerspectiveCamera;

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
		this.initialized.resolve();
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

	setScene(scene){
		this.scene = scene;
	}

	onComponentAdded(component: core.Component){
		this.scene.add(component.object);
	}

	onComponentRemoved(component: core.Component){
		this.scene.remove(component.object);
	}

	loadScene(path){
		var loader = new THREE.ObjectLoader();
		var self = this;
    loader.load(path, (scene) => {
			self.scene.copy(scene);
			self.setSize();
    });
	}
}