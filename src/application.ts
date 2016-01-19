import core = require('./core');
import {Player} from './player';
import ThreeRenderSystem = require('./systems/threeRender');

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

	constructor(public name: string, systems?: Array< {new():core.System} >, config?: core.AppDefaults){
		this.settings = this.defaults;
		_.assign(this.settings, config);
		for (var i in systems){
			var system = new systems[i]();
			system.init();
			system.subscribeToPool(this.pool);
			this.systems.push(system);
		}
		this.setPawn();
	}

	setPawn(){
		this.pawn = new this.settings.pawn();
		var renderSystem = <ThreeRenderSystem>_.find(this.systems, {type: 'render'});
		if (renderSystem){
			var camera = this.pawn.get('camera');
			renderSystem.setCamera(camera.object);
		}
		this.pool.addObject(this.pawn);
	}

	run(controller?: Function){
		if (controller){
			controller.call(this);
		}
		this.foo();
		return this;
	}

	foo(){
		for (var i=0; i<this.systems.length; i++){
			this.systems[i].run(this.pool);
		}
		window.requestAnimationFrame(this.foo.bind(this));
	}

	entity(name: string, components: Array<{new():core.Component}>, constructor: Function){
		var entity = new core.Entity(name, components);
		this._entities.push(entity);
		return this;
	}

	appConfig(callback: Function){

	}

	sysConfig(systemType: string, configCallback: Function){
		var system = _.find(this.systems, {type: systemType});

		if (system){
			configCallback.call(this, system);
		}
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
