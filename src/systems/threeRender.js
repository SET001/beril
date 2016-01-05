"use strict";

Beril.ThreeRenderSystem = class extends Beril.RenderSystem{
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

	run(pool){
		if (!this.initialized) this.init();
		if (this.camera && this.scene) {
			this.renderer.render(this.scene, this.camera);
		}
	}

	loadScene(path){
		var loader = new THREE.ObjectLoader();
		var self = this;
    loader.load(path, (scene) => {
			self.scene.copy(scene);
			self.setSize();
    });
	}

	setSize(){
		this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
		if (this.camera){
			this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
			this.camera.updateProjectionMatrix();
		}
	}

	setScene(scene){
		this.scene = scene;
	}

	setCamera(camera){
		this.camera = camera;
	}

	onComponentAdded(component){
		this.scene.add(component.mesh);
		// console.log(component, this.scene);
	}

	onComponentRemoved(component){
		this.scene.remove(component.mesh);
	}
};
