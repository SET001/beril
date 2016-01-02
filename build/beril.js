"use strict";

var Beril = {
	_componentIndex: 0,
	_systemIndex: 0,
	_entityIndex: 0,
};
Object.defineProperty(Beril, "version", {value: 0.0.0});

"use strict";

Beril.Application = class{

	constructor(){
		this.initialized = false;
		this.defaults = {
			mode: Beril.DefaultApplicationMode,
			scene: 'scene1'};

		this.scenes = [];
		this.modes = [];
		this.config = {};

		this.pool = new Beril.Pool();
	}

	init(config){
		_.assign(this.config, this.defaults, config);
		// this.scenes[this.defaults.scene] = {};
		this.setMode();
		this.initialized = true;
		return this;
	}

	run(){
		if (!this.initialized) this.init();
		this.mode.run();
	}

	setMode(mode){
		this.mode = new (mode ? mode : this.config.mode)();
		this.mode.application = this;
		this.mode.init();
	}
};

"use strict";
Beril.ApplicationMode = class{
	constructor(systems){
		this.systemsClasses = systems;
		this.initialized = false;
		this.defaults = {
			pawn: Beril.PlayerCharacter
		};
		this.config = {};
		this.systems = [];
		this.pawn = null;

		this.initializers = [];
	}

	init(config){
		_.assign(this.config, this.defaults, config);
		if (this.systemsClasses && this.systemsClasses.length){
			for(var i=0; i<this.systemsClasses.length; i++){
				var system = new this.systemsClasses[i];
				this.addSystem(system);
			}
		}
		this.setPawn();
		this.initialized = true;
	}

	setPawn(){
		this.pawn = new this.config.pawn();
		var renderSystem = _.find(this.systems, {name: 'render'});
		console.log(renderSystem);
		console.log(this.pawn);
		var camera = _.find(this.pawn.components, {type: 'camera'});
		console.log("===>", camera);
		renderSystem.setCamera(camera.object);
		this.application.pool.add(this.pawn);
	}

	addSystem(system){
		if(!_.find(this.systems, {name: system.name})){
			system.init();
			var systemName = system.name.charAt(0).toUpperCase() + system.name.slice(1) + 'System';
			var setUpFunction = `setUp${systemName}`;
			if (this[setUpFunction]){
				this.initializers.push(this[setUpFunction](system));
			}
			this.systems.push(system);
			if (system.componentTypes.length){
				system.subscribeToPool(this.application.pool, system.componentTypes);
			}
		}
	}

	removeSystem(systemName){

	}

	run(){
		if (!this.initialized) this.init();
		for (var i=0; i<this.systems.length; i++){
			this.systems[i].run(this.application.pool);
		}
		window.requestAnimationFrame(this.run.bind(this));
	}
}

Beril.Component = class{
	constructor(){
		this.id = Beril._componentIndex++;
		this.type = "basic";
		this.entity = {};
	}
};

Beril.GameObject = class {
	constructor(componentClasses){
		this.components = [];
		this.id = Beril._entityIndex++;
		this.pool = null;

		if (componentClasses && componentClasses.length){
			for(var i in componentClasses){
				var component = new componentClasses[i]();
				var componentName = component.type.charAt(0).toUpperCase() + component.type.slice(1) + 'Component';
				var setUpFunction = `setUp${componentName}`;
				if (this[setUpFunction]){
					this[setUpFunction](component);
				}
				this.add(component);
			}
		}
	}

	add(component){
		component.entity = this;
		this.components.push(component);
		if (this.pool){
			this.pool.addComponent(component);
		}
	}

	remove(componentType){
		if (this.pool){
			this.pool.removeComponent(_.find(this.components, {type: componentType}));
		}
		this.components = _.reject(this.components, {type: componentType});
	}
};

Beril.PlayerCharacter = class extends Beril.GameObject{
	constructor(){
		super([
			Beril.PositionComponent,
			Beril.CameraComponent,
			Beril.InputComponent,
			Beril.CollisionComponent,
			Beril.PhysicComponent,
			// Beril.TranslationComponent
		]);
	}

	setUpCameraComponent(component){
		component.init('orthographic');
	}
}

Beril.Pool = class {
	constructor(){
		this.components = {};
		this.subscriptions = [];
	}

	add(object){
		for (var i in object.components){
			var component = object.components[i];
			this.addComponent(component);
			for(var j in this.subscriptions){
				var subscription = this.subscriptions[j];
				if (subscription.componentTypes.indexOf(component.type)>-1){
					subscription.system.onComponentAdded(component);
				}
			}
		}
		object.pool = this;
	}

	remove(object){

	}

	addComponent(component){
		if (!this.components[component.type]){
			this.components[component.type] = [];
		}
		this.components[component.type].push(component);
	}

	removeComponent(component){
		this.components[component.type] = _.reject(this.components[component.type], {id: component.id});
	}

	addSubscription(system, componentTypes){
		this.subscriptions.push({
			system: system,
			componentTypes: componentTypes
		});
	}

	removeSubscription(system){

	}
}

Beril.System = class {
	constructor(){
		this.initialized = false;
		this.componentTypes = ['basic'];
		this.name = 'basic';
	}

	controller(component){}

	onComponentAdded(){}

	onComponentRemoved(){}

	run(pool){
		for (var j=0; j<this.componentTypes.length; j++){
			for(var i=0; i<pool.components[this.componentTypes[j]].length; i++){
				this.controller(pool.components[this.componentTypes[j]][i]);
			}
		}

		// for(var i=0; i<pool.components[this.name].length; i++){
		// 	this.controller(pool.components[this.name][i]);
		// }
	}

	subscribeToPool(pool, componentTypes){
		pool.addSubscription(this, componentTypes || this.componentTypes );
	}

	unsubscribeFromPool(pool){

	}

	init(){
		this.initialized = false;
	}
};

"use strict";

Beril.CameraComponent = class extends Beril.Component{
	constructor(){
		super();
		this.type = 'camera';

	}

	init(cameraType){
		// if (!cameraType) cameraType = 'perspective';
		// var fow = 50;
		// var near = 1;
		// var far = 20000;

		// var aspect = renderSystem.renderer.domElement.width / renderSystem.renderer.domElement.height;
		// var left = renderSystem.renderer.domElement.width / -2;
		// var right = renderSystem.renderer.domElement.width / 2;
		// var top = renderSystem.renderer.domElement.height / 2;
		// var bottom = renderSystem.renderer.domElement.height / -2;
		// var cubeResolution = 128;
		// switch (cameraType.toLowerCase()){
		// 	case 'perspective':
		// 		this.object = new THREE.PerspectiveCamera(fow, aspect, near, far);
		// 		break;
		// 	case 'orthographic':
		// 		this.object = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
		// 		break;
		// 	case 'cube':
		// 		this.object = new THREE.CubeCamera(near, far, cubeResolution );
		// 		break;
		// }
		this.object = new THREE.PerspectiveCamera(45, 1, 1, 1000);
		this.object.position.set(1, 0, 10);
		// this.object.lookAt(0, 0, 0);
	}
};

"use strict";

Beril.CollisionComponent = class extends Beril.Component{
	constructor(){
		super();
		this.type = 'collision';

	}
};

"use strict";

Beril.InputComponent = class extends Beril.Component{
	constructor(){
		super();
		this.type = 'input';
	}
};

"use strict";

Beril.PhysicComponent = class extends Beril.Component{
	constructor(){
		super();
		this.type = 'physic';
	}
};

"use strict";

Beril.PositionComponent = class extends Beril.Component{
	constructor(){
		super();
		this.type = 'position';
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}
};

"use strict";

Beril.RenderComponent = class extends Beril.Component{
	constructor(){
		super();
		this.type = 'render';
		this.mesh = null;
	}
};

"use strict";
Beril.TranslationComponent = class extends Beril.Component{
	constructor(){
		super();
		this.type = 'translation';
		this.position = new THREE.Vector3();
		this.scale = new THREE.Vector3();
		this.rotation = new THREE.Vector3();
	}
}

"use strict";
Beril.DefaultApplicationMode = class extends Beril.ApplicationMode{
	constructor(){
		super()
	}
}

"use strict";

Beril.RenderSystem = class extends Beril.System{
	constructor(){
		super();
		this.name = 'render';
		this.componentTypes.push('render');

		this.camera = null;
		this.scene = null;
	}

	run(pool){}

	init(){}

	switchScene(scene){}

	switchCamera(){}

	setSize(){}
};

"use strict";

Beril.ThreeRenderSystem = class extends Beril.RenderSystem{
	constructor(){
		super();
		this.container = document.body;
		this.renderer = new THREE.WebGLRenderer();
		this.scene = new THREE.Scene();
	}

	init(){
		super.init();
		this.container.appendChild(this.renderer.domElement);
		window.addEventListener('resize', () => this.setSize());
		this.setSize();
	}

	run(pool){
		if (!this.initialized) this.init();
		if (this.camera && this.scene) {
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

	setScene(scene){
		this.scene = scene;
	}

	setCamera(camera){
		console.log("camera set!", camera);
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

"use strict";

Beril.TranslationSystem = class extends Beril.System{
	constructor(){
		super();
		this.name = 'translation';
		this.componentTypes = ['translation'];
	}

	controller(component){
		var renderComponent = _.find(component.entity.components, {type: 'render'});
		renderComponent.mesh.position.add(component.position);
		renderComponent.mesh.rotation.x += component.rotation.x;
		renderComponent.mesh.rotation.y += component.rotation.y;
		// renderComponent.mesh.rotation.z += component.rotation.z;
		// console.log();
	}
};
