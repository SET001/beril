export var _applications: Array<Application> = [];

var _applicationId:number = 0;
var _componentId:number = 0;
var _systemId:number = 0;
var fooo: string;

export var version: string = '0.1.8888';

export class Component{
	id: number;
	type: string = 'basic';
	name: string = 'basic';
	entity: Entity;
	object: any;
	dependencies: Array<any> = [];
	dependents: Array<String> = [];
	constructor(){
		this.id = newComponentId();
	}

	init(): Boolean {return true;}
}

// export function reset(){
// 	_applicationId = 0;
// 	_componentId = 0;
// 	_systemId = 0;
// 	_applications = [];
// }

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
	application: Application;
	initialized: Q.Deferred<any>;
	type: string = 'basic';
	// deps: {new(): System}[];

	constructor(){
		this.initialized = Q.defer();
	}
	controller(component: Component){}

	onComponentAdded(component: Component){}

	onComponentRemoved(component: Component){}

	run(pool: Pool){
		if (pool.components[this.type] && pool.components[this.type].length){
			for (var i = 0; i<pool.components[this.type].length; i++){
				this.controller(pool.components[this.type][i]);
			}
		} else {
			// console.log("no components of type ", this.type);
		}
	}

	subscribeToPool(pool: Pool){
		pool.addSubscription(this);
	}

	unsubscribeFromPool(pool: Pool){

	}

	init(systems?: any){
		this.initialized.resolve();
	}
}

export interface IEntity{
	new(name: string, components: Array<{new():Component}>)
}


export class Entity{
	id: number;
	pool: Pool;
	components: Array<Component> = [];
	addComponents: Array<{new():Component}> = [];
	ready: Q.Promise<any>;
	initialisers: Array<Q.Promise<any>> = [];
	depChain: Array<String> = [];

	constructor(public name?: string){
		this.id = newComponentId();
	}

	setUpComponents(){
		this.addComponents.map( (componentConstructor) => {
			this.add(componentConstructor);
		});
	}

	init(initFunc?: Function):Q.Promise<any>{
		this.setUpComponents();
		this.ready = Q.all(this.initialisers);
		this.ready.then(() => {
			initFunc.call(this);
		});
		return this.ready;
	}

	add(componentConstructor: {new(): Component}): any{
		var
			component:Component = new componentConstructor(),
			existingComponent: Component = this.get(component.type);

		if (!existingComponent){
			if (this.depChain.indexOf(component.type) > -1){
				this.depChain = [];
				throw("circular dependencies");
			} else {
				this.depChain.push(component.type);
				component.entity = this;
				var depComps = [];
				for(var i in component.dependencies){
					var depComp = this.add(component.dependencies[i]);
					if (!depComp){
						this.depChain = [];
						throw("Can't initialize component " + component.type + " because it is depend on component " + this.depChain[this.depChain.length-1] + " which failed to initalize.");
					} else {
						depComps.push(depComp);
					}
				}
				if (component.init()){
					depComps.map(function(comp){
						comp.dependents.push(component.type);
					});
					var componentName = component.type.charAt(0).toUpperCase() + component.type.slice(1);
					var setUpFunction = `setUp${componentName}`;

					if (this[setUpFunction]){
						this.initialisers.push(this[setUpFunction](component));
					}
					this.components.push(component);
					if (this.pool){
						this.pool.add(component);
					}
					this.depChain = _.without(this.depChain, component.type);
					return component;
				};
			}
		}
		return existingComponent;
	}

	get(componentType: string){
		return _.find(this.components, {type: componentType});
	}

	remove(componentType: string){
		var component = this.get(componentType);
		if (component){
			component.dependents.map((compType:string) =>{
				this.remove(compType);
			});

			if (this.pool){
				this.pool.removeComponent(component);
			}
			this.components = _.reject(this.components, { type: componentType });
		}
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

	removeObject(object: Entity){
		for (var i in object.components){
			var component = object.components[i];
			this.removeComponent(component);
			for(var j in this.subscriptions){
				var subscription = this.subscriptions[j];
				if (subscription.type === component.type){
					subscription.onComponentRemoved(component);
				}
			}
		}
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
	initializers: Q.Promise<any>[];
	controllers: any[];
	items: any[];

	setPawn()
	_run(controller?: Function)
	run(controller?: Function)
	appConfig(callback: Function)
	sysConfig(systemType: string, configCallback: Function)
	initSystems()
	config(a: string|Function, b?: Function)
	animate()
	looper()
	entity(name: string, components: Array<{new():Component}>, constructor: Function)
	system(name: string, system: {new(): System}): Application
	addSystem(system: System)
	getSystem(type: string)
	addObject(object: Entity)
	removeObject(object: Entity)
}

import applications = require ('./application');

// export function application(name: string, systems?: Array< {new():System}>):Application{
// 	var application: applications.BasicApplication;
// 	if (systems){
// 		application = new applications.BasicApplication(name, systems);
// 		_applications.push(application);
// 	} else {
// 		application = <Application> _.find(_applications, { name: name });
// 	}
// 	return application;
	
// }