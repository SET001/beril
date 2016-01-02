Beril.System = class {
	constructor(){
		this.initialized = false;
		this.componentTypes = ['basic'];
		this.name = 'basic';
	}

	controller(component){}

	onComponentAdded(){}

	onComponentRemoved(){}

	run(pool){
		for (var j=0; j<this.componentTypes.length; j++){
			for(var i=0; i<pool.components[this.componentTypes[j]].length; i++){
				this.controller(pool.components[this.componentTypes[j]][i]);
			}
		}

		// for(var i=0; i<pool.components[this.name].length; i++){
		// 	this.controller(pool.components[this.name][i]);
		// }
	}

	subscribeToPool(pool, componentTypes){
		pool.addSubscription(this, componentTypes || this.componentTypes );
	}

	unsubscribeFromPool(pool){

	}

	init(){
		this.initialized = false;
	}
};
