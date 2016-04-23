import core = require('../core');
import components = require('../components');

export class MeshObject extends core.Entity{

	addComponents = [
		components.RotationComponent,
		components.PositionComponent,
		components.ScaleComponent,
		components.RenderComponent,
		components.MeshComponent,
		components.TranslationComponent
	];
	
	constructor() { super(); }

	setUpComponents(){
		super.setUpComponents();
		var renderComponent = this.get('render');
		var comps = ['position', 'rotation', 'scale'];
		for (var i in comps){
			var component = this.get(comps[i]);
			if (component){
				component.object = renderComponent.object[comps[i]];
			}
		}
	}
}
