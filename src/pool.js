Beril.Pool = class {
	constructor(){
		this.components = {};
		this.subscriptions = [];
	}

	add(object){
		for (var i in object.components){
			var component = object.components[i];
			this.addComponent(component);
			for(var j in this.subscriptions){
				var subscription = this.subscriptions[j];
				if (subscription.componentTypes.indexOf(component.type)>-1){
					subscription.system.onComponentAdded(component);
				}
			}
		}
		object.pool = this;
	}

	remove(object){

	}

	addComponent(component){
		if (!this.components[component.type]){
			this.components[component.type] = [];
		}
		this.components[component.type].push(component);
	}

	removeComponent(component){
		this.components[component.type] = _.reject(this.components[component.type], {id: component.id});
	}

	addSubscription(system, componentTypes){
		this.subscriptions.push({
			system: system,
			componentTypes: componentTypes
		});
	}

	removeSubscription(system){

	}
}
