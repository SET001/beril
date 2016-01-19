export var _applications: Array<Application> = [];
var _applicationId:number = 0;
var _componentId:number = 0;
var _systemId:number = 0;

export class Component{
	id: number;
	type: string = 'basic';
	entity: Entity;
	object: any;
	constructor(){
		this.id = newComponentId();
	}
}

export function reset(){
	_applicationId = 0;
	_componentId = 0;
	_systemId = 0;
	_applications = [];
}

export function newApplicationId(){
	return _applicationId++;
}

export function newSystemId(){
	return _systemId++;
}

export function newComponentId(){
	return _systemId++;
}


export class System{
	pool: Pool;
	initialized: boolean = false;
	type: string = 'basic';

	controller(component: Component){}

	onComponentAdded(component: Component){}

	onComponentRemoved(component: Component){}

	run(pool: Pool){
		this.controller(pool.components[this.type]);
	}

	subscribeToPool(pool: Pool){
		pool.addSubscription(this);
	}

	unsubscribeFromPool(pool: Pool){

	}

	init(){
		this.initialized = true;
	}
}

export class Entity{
	id: number;
	pool: Pool;
	components: Array<Component> = [];

	constructor(public name: string, components: Array<{new():Component}>){
		this.id = newComponentId();
		components.map( (componentConstructor) => {
			var component = new componentConstructor();
			this.add(component);
			var componentName = component.type.charAt(0).toUpperCase() + component.type.slice(1);
			var setUpFunction = `setUp${componentName}`;
			if (this[setUpFunction]){
					this[setUpFunction](component);
				}
		});
	}

	add(component: Component){
		component.entity = this;
		this.components.push(component);
		if (this.pool){
			this.pool.add(component);
		}
	}

	get(componentType: string){
		return _.find(this.components, {type: componentType});
	}

	remove(componentType: string){
		if (this.pool){
			this.pool.removeComponent(_.find(this.components, {type: componentType}));
		}
		this.components = _.reject(this.components, { type: componentType });
	}
}

export class Pool{
	components: {};
	subscriptions: Array<System> = [];

	constructor(){
		this.components = {};
	}
	
	addComponent(component: Component){
		if (!this.components[component.type]){
			this.components[component.type] = [];
		}
		this.components[component.type].push(component);
	}

	addObject(object: Entity){
		for (var i in object.components){
			var component = object.components[i];
			this.addComponent(component);
			for(var j in this.subscriptions){
				var subscription = this.subscriptions[j];
				if (subscription.type === component.type){
					subscription.onComponentAdded(component);
				}
			}
		}
		object.pool = this;
	}

	add(item: Component | Entity){
		if (item instanceof Component){
			this.addComponent(item);
		} else if (item instanceof Entity){
			this.addObject(item);
		}
	}

	removeComponent(component: Component){
		this.components[component.type] = _.reject(this.components[component.type], {id: component.id});
	}

	addSubscription(system: System){
		this.subscriptions.push(system);
		system.pool = this;
	}

	removeSubscription(system: System){
		
	}
}

export interface AppDefaults{
	pawn: {new():Entity};
	scene: string;
}

export interface Application{
	id: number;
	name: string;
	defaults: AppDefaults;
	settings: AppDefaults;
	controller: Function;
	pool: Pool;
	systems: System[];
	_entities: Array<Entity>;
	pawn: Entity;
	scenes: any[];

	setPawn()
	run(controller?: Function)
	entity(name: string, components: Array<{new():Component}>, constructor: Function)
	appConfig(callback: Function)
	sysConfig(systemType: string, configCallback: Function)
	config(a: string|Function, b?: Function)
	foo()
}