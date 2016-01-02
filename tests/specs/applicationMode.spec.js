"use strict";
var TestApplicationMode = class extends Beril.ApplicationMode{
	constructor(){
		super([TestSystem]);
	}

	setUpTestSystem(){}
}
var TestSystem = class extends Beril.System{
	constructor(){
		super();
		this.name = 'test';
	}
};

describe('ApplicationMode', function(){
	var applicationMode, application, spy;

	beforeEach(function(){
		application = new Beril.Application();
		spy = spyOn(TestApplicationMode.prototype, 'setUpTestSystem');
		application.init({mode: TestApplicationMode});
		application.mode.addSystem(new TestSystem());
	});

	it('should add systems from constructor', function(){
		expect(application.mode.systems.length).toBe(1);
	});

	// it('should ignore non array first constructor parameter', function(){
	// 	applicationMode = new Beril.ApplicationMode({foo:1});
	// 	applicationMode.init();
	// 	expect(applicationMode.systems.length).toBe(0);
	// })

	it('should not add same system twice', function(){
		application.mode.addSystem(new TestSystem());
		expect(application.mode.systems.length).toBe(1);
	});

	it('should run system setup function if present', function(){
		expect(spy).toHaveBeenCalled();
	})
});
