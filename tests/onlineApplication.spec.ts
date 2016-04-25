/// <reference path="definitions/definitions.d.ts" />

import beril = require('../src/beril');

describe('Applications', function(){
	// describe('Online Application', function(){
	// 	var app;
	// 	var mockServer = new MockServer('http://127.0.0.1:8080');
	// 	window.io = MockSocketIO;
	//   // mockServer.on('connection', function(server) {
	    
	//   // });

	// 	beforeEach(function(){
	// 		app = new beril.OnlineApplication('test', []);
	// 		app.connect();
	// 	});

	// 	it('should add entity from chunk updates', function(){
	// 		mockServer.emit('itemAdd', {_id: 1, name: 'testMesh', class: 'beril.BoxMesh'});
	// 		var foo = _.find(app.items, {_id: 1});
	// 		expect(foo).toBeTruthy();
	// 	});

	// 	it('should update existing entity on chunk updates', function(){
	// 		mockServer.emit('itemAdd', {_id: 1, name: 'testMesh', class: 'beril.BoxMesh', position: {x: 0, y: 0, z: 0}});
	// 		mockServer.emit('itemUpdate', {_id: 1, name: 'testMesh', class: 'beril.BoxMesh', position: {x: 0, y: 0, z: 10}});
	// 		var foo = _.find(app.items, {_id: 1});
	// 		expect(app.items.length).toBe(1);
	// 		expect(foo.get('position').object.z).toBe(10);
	// 	});

	// 	it('should avoid adding objects with same ID', function(){
	// 		mockServer.emit('itemAdd', {_id: 1, name: 'testMesh', class: 'beril.BoxMesh', position: {x: 0, y: 0, z: 0}});
	// 		mockServer.emit('itemAdd', {_id: 1, name: 'testMesh', class: 'beril.BoxMesh', position: {x: 0, y: 0, z: 0}});
	// 		expect(app.items.length).toBe(1);
	// 	});

	// 	it('should remove object', function(){
	// 		mockServer.emit('itemAdd', {_id: 1, name: 'testMesh', class: 'beril.BoxMesh'});
	// 		expect(app.items.length).toBe(1);
	// 		mockServer.emit('itemRemove', {_id: 1});
	// 		expect(app.items.length).toBe(0);
	// 	});
	// });
});