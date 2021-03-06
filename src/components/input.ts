import core = require('../core');

export class InputComponent extends core.Component{
	type = 'input';

	movingSpeed: number = 1;
	runingSpeed: number = 3;
	mouseSpeed: number = 0.003;
	wheelSpeed: number = 0.7;
	keyMappings: {};
	controller: Function;

	constructor(){
		super();
		this.keyMappings = {
			W: 'moveForward',
			S: 'moveBackward',
			A: 'moveLeft',
			D: 'moveRight',
			Space: 'jump',
			Click: 'shoot'
		};
	}
};