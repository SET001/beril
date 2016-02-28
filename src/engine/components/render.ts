import core = require('../core');

export class RenderComponent extends core.Component{
	type: string = 'render';
	object: THREE.Object3D;
}