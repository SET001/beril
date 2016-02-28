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
		18: 'Alt'
	};
	pointerLockEnabled: boolean = false;
	//deps = ['threeRender'];	//	dependencies

	init(){
		_.find(this.application.systems, {type: 'render'}).initialized.promise.then((renderSystem) => {
			var container = renderSystem.container;
			if (this.useMouse && 'pointerLockElement' in document){
				container.onclick = function(){
	    		if (!this.pointerLockEnabled){
						container.requestPointerLock();
	    		}else{

	    		}
	    	};
	    	document.addEventListener('mousewheel', this.mouseWheel.bind(this));
	    	document.addEventListener('pointerlockchange', () => {
	    		this.pointerLockEnabled = (document.pointerLockElement == container);
					if(this.pointerLockEnabled){
						document.addEventListener("mousemove", this.mouseMove.bind(this), false);
					}else{
						document.removeEventListener("mousemove", this.mouseMove.bind(this), false);
					};
				}, false);
			} else {console.log("no mouse controlls");}
		});
		this.initialized.resolve(this);
	}

	// controller(component: core.Component){
	// 	console.log("Ads");
	// 	// for(var action in this.actions){
	// 	// 	if (this.actions[action]){
	// 	// // 		var controllerActionName = action in component.keyMappings ? component.keyMappings[action] : action;
	// 	// // 		// console.log(controllerActionName, component.controller);
	// 	// // 		if (component.controller[controllerActionName]){
	// 	// // 			component.controller[controllerActionName](this.actions);
	// 	// // 		}
	// 	// 	}
	// 	// }
	// 	// this.actions.mouseLeft = false;
	// 	// this.actions.mouseRight = false;
	// 	// this.actions.mouseUp = false;
	// 	// this.actions.mouseDown = false;
	// }

	// run(){
	// 	console.log("######");
	// }

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