Beril.GameObject = class {
	constructor(componentClasses){
		this.components = [];
		this.id = Beril._entityIndex++;
		this.pool = null;

		if (componentClasses && componentClasses.length){
			for(var i in componentClasses){
				var component = new componentClasses[i]();
				var componentName = component.type.charAt(0).toUpperCase() + component.type.slice(1) + 'Component';
				var setUpFunction = `setUp${componentName}`;
				if (this[setUpFunction]){
					this[setUpFunction](component);
				}
				this.add(component);
			}
		}
	}

	add(component){
		component.entity = this;
		this.components.push(component);
		if (this.pool){
			this.pool.addComponent(component);
		}
	}

	remove(componentType){
		if (this.pool){
			this.pool.removeComponent(_.find(this.components, {type: componentType}));
		}
		this.components = _.reject(this.components, {type: componentType});
	}
};
