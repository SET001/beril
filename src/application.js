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
