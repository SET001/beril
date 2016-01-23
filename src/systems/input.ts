import core = require('../core');

export class InputSystem extends core.System{
	name = 'input';

	controllers: Function[] = [];
	actions:{} = {};
	useKeyboard: boolean = true;
	useMouse: boolean = true;
	keyMapping: {} = {
		32: 'Space',
		16: 'Shift',
		17: 'Ctrl',
		18: 'Alt'
	};
	//deps = ['threeRender'];	//	dependencies

	controller(component: core.Component){
		// for(var action in this.actions){
		// 	if (this.actions[action]){
		// 		var controllerActionName = action in component.keyMappings ? component.keyMappings[action] : action;
		// 		// console.log(controllerActionName, component.controller);
		// 		if (component.controller[controllerActionName]){
		// 			component.controller[controllerActionName](this.actions);
		// 		}
		// 	}
		// }
		// this.actions.mouseLeft = false;
		// this.actions.mouseRight = false;
		// this.actions.mouseUp = false;
		// this.actions.mouseDown = false;
	}

	init(){
		this.initialized = true;
	}
}