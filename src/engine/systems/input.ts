import core = require('../core');

class InputActions{
	mouseUp: number;
	mouseDown: number;
	mouseLeft: number;
	mouseRight: number;
}
export class InputSystem extends core.System{
	type = 'input';

	controllers: Function[] = [];
	actions: InputActions = new InputActions();
	useKeyboard: boolean = true;
	useMouse: boolean = true;
	keyMapping: {} = {
		32: 'Space',
		16: 'Shift',
		17: 'Ctrl',
		18: 'Alt',
		W: 'moveForward',
		S: 'moveBackward',
		A: 'moveLeft',
		D: 'moveRight',
	};
	pointerLockEnabled: boolean = false;
	//deps = ['threeRender'];	//	dependencies

	init(){
		var self = this;
		_.find(this.application.systems, {type: 'render'}).initialized.promise.then((renderSystem) => {
			var container = renderSystem.container;
			if (this.useMouse && 'pointerLockElement' in document){
				container.onclick = function(){
	    		if (!this.pointerLockEnabled){
						container.requestPointerLock();
	    		}else{

	    		}
	    	};
	    	var listener = this.mouseMove.bind(this);
	    	document.addEventListener('mousewheel', this.mouseWheel.bind(this));
	    	document.addEventListener('pointerlockchange', () => {
	    		this.pointerLockEnabled = (document.pointerLockElement == container);
					if(this.pointerLockEnabled){
						document.addEventListener("mousemove", listener, false);
					}else{
						document.removeEventListener("mousemove", listener, false);
					};
				}, false);
			} else {
				console.log("no mouse controlls");
			}

			if (this.useKeyboard){
				document.onkeydown = function(e){
					var action = null;
					if (e.which in self.keyMapping){
						action = self.keyMapping[e.which];
					} else {
						if (String.fromCharCode(e.which) in self.keyMapping){
							action = self.keyMapping[String.fromCharCode(e.which)];
						}
						else{
							action = String.fromCharCode(e.which);
						}
					}
					self.actions[action] = true;
				}
				document.onkeyup = function(e){
					var action = null;
					if (e.which in self.keyMapping){
						action = self.keyMapping[e.which]
					}
					else {
						if (String.fromCharCode(e.which) in self.keyMapping){
							action = self.keyMapping[String.fromCharCode(e.which)];	
						}
						else {
							action = String.fromCharCode(e.which);
						}
					}
					if (action)
						self.actions[action] = false;
				}
			}
		});
		this.initialized.resolve(this);
	}

	controller(component: core.Component){
		// console.log(this.actions);
		for(var action in this.actions){
			if (this.actions[action]){
				var controllerActionName = action in component.keyMappings ? component.keyMappings[action] : action;
	// 	// // 		// console.log(controllerActionName, component.controller);
				if (component.controller[controllerActionName]){
					component.controller[controllerActionName](this.actions);
				}
			}
		}
		this.actions.mouseLeft = 0;
		this.actions.mouseRight = 0;
		this.actions.mouseUp = 0;
		this.actions.mouseDown = 0;
	// }

	// run(){
	// 	console.log("######");
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
}