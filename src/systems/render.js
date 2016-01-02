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
