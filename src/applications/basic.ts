import core = require('../core');

import injector = require('../di');
import systems = require('../systems');
import entities = require('../entities');

export class BasicApplication{
	defaults: core.AppDefaults  = {
		pawn: entities.Player,
		scene: 'scene1'
	};
	settings: core.AppDefaults;
	pool: core.Pool = new core.Pool();
	systems: core.System[] = [];
	_entities: Array<core.Entity> = [];
	pawn: core.Entity;
	scenes: any[];
	initializers: Q.Promise<any>[] = [];
	controllers: any[] = [];
	running: boolean = false;
	active: boolean = false;	//	is user controls active
	items: any[] = [];
	container: HTMLElement = document.body;

	constructor(systems?: Array< {new():core.System} >, config?: core.AppDefaults){
		this.settings = this.defaults;
		_.assign(this.settings, config);
		for (var i in systems){
			var system = new systems[i]();
			system.application = this;
			this.systems.push(system);
		}
	}

	controller(){}

	setPawn(){
		this.pawn = new this.settings.pawn();
		this.pawn.init();
		var renderSystem = <systems.ThreeRenderSystem>_.find(this.systems, {type: 'render'});
		if (renderSystem){
			var camera = this.pawn.get('camera');
			renderSystem.setCamera(camera.object);
			renderSystem.setSize();
		} else {
			// console.log("Can't find render system!");
		}
		this.addObject(this.pawn);
	}

	// _run(controller?: Function){
	// 	this.setPawn();
	// 	if (controller){
	// 		injector.resolve(controller, this)();
	// 	}
	// 	this.running = true;
	// 	this.looper();
	// 	// window.requestAnimationFrame(this.looper.bind(this));
	// }

	run(controller?: Function){
		this.initSystems();
		this.setPawn();
		this.controller();
		if (controller){
			injector.resolve(controller, this)();
		}
		this.running = true;
		this.looper();
		return this;
	}

	initSystems(){
		for (var i in this.systems){
			var system = this.systems[i];
			system.init();
			var setUpFunction = 'setUp'+system.type.charAt(0).toUpperCase() + system.type.slice(1);
			if (this[setUpFunction]){
				this[setUpFunction](system);
			}

			system.subscribeToPool(this.pool);
		}
	}

	addObject(object){
		object.init().then(() => {
			this.pool.addObject(object);
			if (object.controller){
				this.controllers.push(object);
			};
		});
		this.items.push(object);
	}

	removeObject(object){
		this.pool.removeObject(object);
		this.items = _.reject(this.items, object);
	}

	addSystem(system: core.System){
		var init = injector.resolve(system.init, system);
		init();
		this.initializers.push(system.initialized.promise);
		system.subscribeToPool(this.pool);
		system.application = this;
		this.systems.push(system);
	}

	getSystem(type: string){
		return _.find(this.systems, {type: type});
	}

	system(name: string, system: {new(): core.System}){
		var si = new system();
		this.addSystem(si);
		injector.register(name, si);
		return this;
	}
	
	sysConfig(systemType: string, configCallback: Function){
		var system = _.find(this.systems, {type: systemType});

		if (system){
			configCallback.call(this, system);
		}
	}
	

	looper(){
		this.animate();
		window.requestAnimationFrame(this.looper.bind(this));
	}

	animate(){
 		for (var i=0; i<this.systems.length; i++){
			// console.log("running ", this.systems[i].type);
			this.systems[i].run(this.pool);
		}
		for (var i=0; i<this.controllers.length; i++){
			this.controllers[i].controller();
		}
	}

	entity(name: string, components: Array<{new():core.Component}>, c: core.IEntity){
		injector.register(name, c);
		return this;
	}

	appConfig(callback: Function){
		injector.resolve(callback, this)();
	}


	config(a: string|Function, b?: Function){
		if (typeof a === 'string'){
			this.sysConfig(a, b);
		} else {
			this.appConfig(a);
		}
		return this;
	}
}
