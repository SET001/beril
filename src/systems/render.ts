import beril = require('./beril');

export class RenderSystem implements beril.System{
	type = 'render';
	container: HTMLElement;
	renderer: any;
	initialized: boolean;

	controller(){}
	run(){}
	init(){}
}