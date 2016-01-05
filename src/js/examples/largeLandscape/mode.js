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


		setUpRenderSystem(system){
			system.container = document.getElementById('container');
			system.renderer.antialias = true;
		}

		init(){
			super.init();
			var renderSystem = _.find(this.systems, {name: 'render'});
			renderSystem.loadScene('src/js/examples/largeLandscape/scene.json');
			this.pawn.components.position.object.y = 500;
			this.pawn.components.position.object.x = 1000;
			this.pawn.components.position.object.z = 1000;
		}
	}
})
