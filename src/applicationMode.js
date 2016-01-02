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
		var camera = _.find(this.pawn.components, {type: 'camera'});
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
