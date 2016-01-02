"use strict";

define(function(require){
	var Beril = require('beril');
	return class extends Beril.ApplicationMode{
		constructor(){
			super([Beril.ThreeRenderSystem, Beril.TranslationSystem]);
		}

		init(){
			super.init();
			this.application.pool.add(new (require('./cube'))());
		}

		setUpRenderSystem(system){
			system.container = document.getElementById('container');
			system.renderer.antialias = true;
		}
	}
})
