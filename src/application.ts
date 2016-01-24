import core = require('./core');
import injector = require('./di');
import systems = require('./systems');
import {Player} from './player';

export class BasicApplication implements core.Application{
	id: number = core.newApplicationId();
	defaults: core.AppDefaults  = {
		pawn: Player,
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

	constructor(public name: string, systems?: Array< {new():core.System} >, config?: core.AppDefaults){
		this.settings = this.defaults;
		_.assign(this.settings, config);
		// collect systems dependenceis
		for (var i in systems){
			this.addSystem(new systems[i]());
		}
		this.setPawn();
	}

	setPawn(){
		this.pawn = new this.settings.pawn();
		var renderSystem = <systems.ThreeRenderSystem>_.find(this.systems, {type: 'render'});
		if (renderSystem){
			var camera = this.pawn.get('camera');
			renderSystem.setCamera(camera.object);
			renderSystem.setSize();
		} else {
			console.log("can't find render system!");
		}
		this.pool.addObject(this.pawn);
	}

	run(controller?: Function){
		if (controller){
			injector.resolve(controller, this)();
		}
		console.log("waiting for system initializers to complete", this.initializers);
		Q.all(this.initializers).then(() => {
			console.log("All systems initialized!");
			this.foo();
		})
		return this;
	}

	addSystem(system: core.System){
		var init = injector.resolve(system.init, system);
		init();
		this.initializers.push(system.initialized.promise);
		system.subscribeToPool(this.pool);
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
	
	foo(){
		for (var i=0; i<this.systems.length; i++){
			this.systems[i].run(this.pool);
		}
		window.requestAnimationFrame(this.foo.bind(this));
	}

	entity(name: string, components: Array<{new():core.Component}>, c: core.IEntity){
		injector.register(name, function(){
			return new c(name, components);
		});
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
