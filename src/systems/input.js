"use strict";

Beril.InputSystem = class extends Beril.System{
	constructor(){
		super();
		this.name = 'input';
		this.componentTypes = ['input'];
		this.controllers = [];
		this.actions = {};
		this.useKeyboard = true;
		this.useMouse = true;
		this.keyMapping = {
			32: 'Space',
			16: 'Shift',
			17: 'Ctrl',
			18: 'Alt'
		};
	}

	init(){
		var self = this;
		var renderSystem = _.find(this.application.mode.systems, {name: 'render'});
		var container = renderSystem.container;

		var mouseCallback = self.mouseMove.bind(self);
		var mouse = new THREE.Vector2();
		this.pointerLockEnabled = false;
		// mouse
		if (this.useMouse && 'pointerLockElement' in document){
			container.onclick = function(){
    		if (!this.pointerLockEnabled){
					container.requestPointerLock();
    		}else{

    		}
    	};
			document.addEventListener('mousewheel', this.mouseWheel.bind(self));
    	document.addEventListener('pointerlockchange', function(){
    		self.pointerLockEnabled = (document.pointerLockElement == container);
				if(self.pointerLockEnabled){
					document.addEventListener("mousemove", mouseCallback, false);
				}else{
					document.removeEventListener("mousemove", mouseCallback, false);
				};
			}, false);
		}
		// keyboard
		if (this.useKeyboard){
			document.onkeydown = function(e){
				var action = null;
				if (e.which in self.keyMapping)
					action = self.keyMapping[e.which]
				else
					action = String.fromCharCode(e.which);
				self.actions[action] = true;
			}
			document.onkeyup = function(e){
				var action = null;
				if (e.which in self.keyMapping)
					action = self.keyMapping[e.which]
				else
					action = String.fromCharCode(e.which);
				if (action)
					self.actions[action] = false;
			}
		}
	}

	controller(component){
		for(var action in this.actions){
			if (this.actions[action]){
				var controllerActionName = action in component.keyMappings ? component.keyMappings[action] : action;
				// console.log(controllerActionName, component.controller);
				if (component.controller[controllerActionName]){
					component.controller[controllerActionName](this.actions);
				}
			}
		}
		this.actions.mouseLeft = false;
		this.actions.mouseRight = false;
		this.actions.mouseUp = false;
		this.actions.mouseDown = false;
		// component.controller();
	}

	onComponentAdded(component){
		// this.controllers.push(new component.controllerClass(component.entity));
	}

	mouseWheel(e){

	}
	mouseMove(e){
		if (Math.abs(e.movementX)<100 && Math.abs(e.movementY) < 100){
			if (e.movementX>0)
				this.actions.mouseRight = e.movementX;
			if (e.movementX<0)
			 	this.actions.mouseLeft = e.movementX;
			if (e.movementY<0)
				this.actions.mouseUp = e.movementY;
			if (e.movementY>0)
			 	this.actions.mouseDown = e.movementY;
		}
	}
};
