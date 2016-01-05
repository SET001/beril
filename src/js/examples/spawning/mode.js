"use strict";

define(function(require){
	var Beril = require('beril');
	return class extends Beril.ApplicationMode{
		constructor(){
			super([
				Beril.ThreeRenderSystem,
				Beril.TranslationSystem,
				Beril.InputSystem,
			]);
		}

		init(){
			super.init();
			for(var i =0; i<1000; i++){
				this.application.pool.add(new (require('./cube'))());
			}
		}

		setUpRenderSystem(system){
			system.container = document.getElementById('container');
			system.renderer.antialias = true;
		}

		setUpInputSystem(system){
			system.useKeyboard = false;
		}
	}
})
