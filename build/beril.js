"use strict";

var Beril = {
	_componentIndex: 0,
	_systemIndex: 0,
	_entityIndex: 0,
};
Object.defineProperty(Beril, "version", {value: '0.0.2'});

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
		if (renderSystem){
			var camera = this.pawn.components.camera;
			renderSystem.setCamera(camera.object);
		}
		this.application.pool.add(this.pawn);
	}

	addSystem(system){
		if(!_.find(this.systems, {name: system.name})){
			system.application = this.application;
			var systemName = system.name.charAt(0).toUpperCase() + system.name.slice(1) + 'System';
			var setUpFunction = `setUp${systemName}`;
			if (this[setUpFunction]){
				this.initializers.push(this[setUpFunction](system));
			}
			this.systems.push(system);
			if (system.componentTypes.length){
				system.subscribeToPool(this.application.pool, system.componentTypes);
			}
			system.init();
		}
	}

	removeSystem(systemName){}

	run(){
		if (!this.initialized) this.init();
		for (var i=0; i<this.systems.length; i++){
			this.systems[i].run(this.application.pool);
		}
		window.requestAnimationFrame(this.run.bind(this));
	}
}

"use strict";

Beril.Component = class{
	constructor(){
		this.id = Beril._componentIndex++;
		this.type = "basic";
		this.entity = null;
	}
};

"use strict";

Beril.GameObject = class {
	constructor(componentClasses){
		this.components = {};
		this.id = Beril._entityIndex++;
		this.pool = null;

		if (componentClasses && componentClasses.length){
			for(var i in componentClasses){
				var component = new componentClasses[i]();
				this.add(component);
				var componentName = component.type.charAt(0).toUpperCase() + component.type.slice(1) + 'Component';
				var setUpFunction = `setUp${componentName}`;
				if (this[setUpFunction]){
					this[setUpFunction](component);
				}
			}
		}
	}

	add(component){
		component.entity = this;
		this.components[component.type] = component;
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

"use strict";

Beril.PlayerCharacter = class extends Beril.GameObject{
	constructor(){
		super([
			Beril.CameraComponent,
			Beril.RotationComponent,
			Beril.PositionComponent,
			Beril.ScaleComponent,
			Beril.RenderComponent,
			Beril.InputComponent,
			Beril.CollisionComponent,
			Beril.PhysicComponent,
			Beril.TranslationComponent,
		]);
		this.name = 'PlayerCharacter';
	}

	setUpCameraComponent(component){
		component.init('orthographic');
	}

	setUpInputComponent(component){
		component.controller = new Beril.FPSPlayerController();
		component.controller.component = component;
	}

	setUpRenderComponent(component){
		component.mesh = new THREE.Object3D();
		var camera = component.entity.components.camera.object;
		camera.mesh = component.mesh;
		component.mesh.add(camera);
		this.components.rotation.object = component.mesh.rotation;
		this.components.position.object = component.mesh.position;
		this.components.scale.object = component.mesh.scale;
	}

	setUpTranslationComponent(component){
		// component.rotation.x = 0.1;
		// component.rotation.y = 0.1;
		// component.rotation.z = 0.1;
	}
}

"use strict";

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

"use strict";

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
	}

	subscribeToPool(pool, componentTypes){
		pool.addSubscription(this, componentTypes || this.componentTypes );
	}

	unsubscribeFromPool(pool){

	}

	init(){
		this.initialized = true;
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
		// this.object.position.set(1, 0, 10);
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
		this.movingSpeed = 1;
		this.runingSpeed = 3;
		this.mouseSpeed = 0.003;
		this.wheelSpeed = 0.7;
		this.keyMappings = {
			W: 'moveForward',
			S: 'moveBackward',
			A: 'moveLeft',
			D: 'moveRight',
			Space: 'jump',
			Click: 'shoot',
		}
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
		this.object = new THREE.Vector3();
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

Beril.RotationComponent = class extends Beril.Component{
	constructor(){
		super();
		this.type = 'rotation';
		this.object = new THREE.Euler();
	}
};

"use strict";

Beril.ScaleComponent = class extends Beril.Component{
	constructor(){
		super();
		this.type = 'scale';
		this.x = 0;
		this.y = 0;
		this.z = 0;
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

Beril.FPSPlayerController = class{
	constructor(){
		// this.mesh = this.entity.renderComponent.object;
	}

	mouseUp(actions){
		this.component.entity.components.camera.object.rotation.x += this.component.mouseSpeed*Math.abs(actions.mouseUp);
	}

	mouseDown(actions){
		this.component.entity.components.camera.object.rotation.x -= this.component.mouseSpeed*Math.abs(actions.mouseDown);
	}

	mouseLeft(actions){
		this.component.entity.components.rotation.object.y += this.component.mouseSpeed*Math.abs(actions.mouseLeft);
	}

	mouseRight(actions){
		this.component.entity.components.rotation.object.y -= this.component.mouseSpeed*Math.abs(actions.mouseRight);
	}

	mouseWheel(movement){}

	moveForward(actions){
		var speed = actions.Shift ? this.component.runingSpeed : this.component.movingSpeed;
		console.log("moving forward", speed);
		this.component.entity.components.translation.position.x += speed/100;
	}

	moveBackward(actions){
		var speed = actions.Shift ? this.component.runingSpeed : this.component.movingSpeed;
		console.log("moving forward", speed);
		this.component.entity.components.translation.position.x -= speed/100;
	}

	moveLeft(actions){

	}

	moveRight(actions){

	}

	jump(){
		console.log("jumping");
	}
	shoot(){
	}
};

"use strict";

Beril.InputSystem = class extends Beril.System{
	constructor(){
		super();
		this.name = 'input';
		this.componentTypes = ['input'];
		this.controllers = [];
		this.actions = {};
		this.useKeyboard = true;
		this.useMouse = true;
		this.keyMapping = {
			32: 'Space',
			16: 'Shift',
			17: 'Ctrl',
			18: 'Alt'
		};
	}

	init(){
		var self = this;
		var renderSystem = _.find(this.application.mode.systems, {name: 'render'});
		var container = renderSystem.container;

		var mouseCallback = self.mouseMove.bind(self);
		var mouse = new THREE.Vector2();
		this.pointerLockEnabled = false;
		// mouse
		if (this.useMouse && 'pointerLockElement' in document){
			container.onclick = function(){
    		if (!this.pointerLockEnabled){
					container.requestPointerLock();
    		}else{

    		}
    	};
			document.addEventListener('mousewheel', this.mouseWheel.bind(self));
    	document.addEventListener('pointerlockchange', function(){
    		self.pointerLockEnabled = (document.pointerLockElement == container);
				if(self.pointerLockEnabled){
					document.addEventListener("mousemove", mouseCallback, false);
				}else{
					document.removeEventListener("mousemove", mouseCallback, false);
				};
			}, false);
		}
		// keyboard
		if (this.useKeyboard){
			document.onkeydown = function(e){
				var action = null;
				if (e.which in self.keyMapping)
					action = self.keyMapping[e.which]
				else
					action = String.fromCharCode(e.which);
				self.actions[action] = true;
			}
			document.onkeyup = function(e){
				var action = null;
				if (e.which in self.keyMapping)
					action = self.keyMapping[e.which]
				else
					action = String.fromCharCode(e.which);
				if (action)
					self.actions[action] = false;
			}
		}
	}

	controller(component){
		for(var action in this.actions){
			if (this.actions[action]){
				var controllerActionName = action in component.keyMappings ? component.keyMappings[action] : action;
				// console.log(controllerActionName, component.controller);
				if (component.controller[controllerActionName]){
					component.controller[controllerActionName](this.actions);
				}
			}
		}
		this.actions.mouseLeft = false;
		this.actions.mouseRight = false;
		this.actions.mouseUp = false;
		this.actions.mouseDown = false;
		// component.controller();
	}

	onComponentAdded(component){
		// this.controllers.push(new component.controllerClass(component.entity));
	}

	mouseWheel(e){

	}
	mouseMove(e){
		if (Math.abs(e.movementX)<100 && Math.abs(e.movementY) < 100){
			if (e.movementX>0)
				this.actions.mouseRight = e.movementX;
			if (e.movementX<0)
			 	this.actions.mouseLeft = e.movementX;
			if (e.movementY<0)
				this.actions.mouseUp = e.movementY;
			if (e.movementY>0)
			 	this.actions.mouseDown = e.movementY;
		}
	}
};

"use strict";

Beril.RenderSystem = class extends Beril.System{
	constructor(){
		super();
		this.name = 'render';
		this.componentTypes.push('render');

		this.camera = null;
		this.scene = null;
	}

	// run(pool){}

	// init(){}

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

"use strict";

Beril.TranslationSystem = class extends Beril.System{
	constructor(){
		super();
		this.name = 'translation';
		this.componentTypes = ['translation'];
	}

	controller(component){
		// var renderComponent = component.entity.components.render;
		// renderComponent.mesh.position.add(component.position);
		// renderComponent.mesh.rotation.x += component.rotation.x;
		// renderComponent.mesh.rotation.y += component.rotation.y;

		var positionComponent = component.entity.components.position;
		positionComponent.object.x += component.position.x;
		positionComponent.object.y += component.position.y;
		positionComponent.object.z += component.position.z;
		var rotationComponent = component.entity.components.rotation;
		rotationComponent.object.x += component.rotation.x;
		rotationComponent.object.y += component.rotation.y;
		rotationComponent.object.z += component.rotation.z;
		// if (component.entity.components.render){
		// 	console.log(rotationComponent.object, component.entity.components.render.mesh.rotation);
		// }

		// renderComponent.mesh.rotation.z += component.rotation.z;
		// console.log();
	}
};
