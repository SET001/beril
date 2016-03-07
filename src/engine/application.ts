import core = require('./core');

import injector = require('./di');
import systems = require('./systems');
import entities = require('./entities');

export class BasicApplication implements core.Application{
	id: number = core.newApplicationId();
	defaults: core.AppDefaults  = {
		pawn: entities.Player,
		scene: 'scene1'
	};
	settings: core.AppDefaults;
	controller: Function;
	pool: core.Pool = new core.Pool();
	systems: core.System[] = [];
	_entities: Array<core.Entity> = [];
	pawn: core.Entity;
	scenes: any[];
	initializers: Q.Promise<any>[] = [];
	controllers: any[] = [];

	constructor(public name: string, systems?: Array< {new():core.System} >, config?: core.AppDefaults){
		this.settings = this.defaults;
		_.assign(this.settings, config);
		for (var i in systems){
			var system = new systems[i]();
			system.application = this;
			this.systems.push(system);
		}
	}

	setPawn(){
		this.pawn = new this.settings.pawn();
		console.log("setting pawn");
		this.pawn.init();
		var renderSystem = <systems.ThreeRenderSystem>_.find(this.systems, {type: 'render'});
		if (renderSystem){
			var camera = this.pawn.get('camera');
			renderSystem.setCamera(camera.object);
			renderSystem.setSize();
		} else {
			console.log("Can't find render system!");
		}
		this.pool.addObject(this.pawn);
		console.log("done");
	}

	_run(controller?: Function){
		this.setPawn();
		if (controller){
			injector.resolve(controller, this)();
		}
		this.looper();
		// window.requestAnimationFrame(this.looper.bind(this));
	}

	run(controller?: Function){
		this.initSystems();
		if (this.initializers.length){
			Q.all(this.initializers).then(() => {
				this._run(controller);
			})
		} else {
			this._run(controller);
		}
		return this;
	}

	initSystems(){
		for (var i in this.systems){
			var system = this.systems[i];
			// var init = injector.resolve(system.init, system);
			// init();
			system.init();
			this.initializers.push(system.initialized.promise);
			system.subscribeToPool(this.pool);
		}
	}

	addObject(object){
		object.init();
		this.pool.addObject(object);
		if (object.controller){
			this.controllers.push(object);
		};
	}

	addSystem(system: core.System){
		var init = injector.resolve(system.init, system);
		init();
		this.initializers.push(system.initialized.promise);
		system.subscribeToPool(this.pool);
		system.application = this;
		this.systems.push(system);
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
