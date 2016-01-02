angular.module('beril', ['ui.router'])
.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
function ($locationProvider, $stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/about");
	$stateProvider
		.state('about', {
			url: '/about',
			views:{
				content: {
					templateUrl: 'src/views/about.html',
				}
			}
		})
		.state('examples', {
			url: '/examples',
			views: {
				'menu': {templateUrl: 'src/views/examples/menu.html'}
			},
		})
		.state('examples.page', {
			url: '/:page',
			views: {
				'content@': {
					controller: function($stateParams){
						console.log("asdasd", $stateParams.page);
						require(['src/js/examples/' + $stateParams.page + '/example'], function(example){
						 	// example();
						});
					}
				}
			},
		})
		.state('tutorial', {
			url: '/tutorial',
			views: {
				'menu': {templateUrl: 'src/views/tutorial/menu.html'}
			},
		})
		.state('tutorial.page', {
			url: '/:page',
			views: {
				'content@': {
					templateUrl: (params) =>	'src/views/tutorial/' + params.page + '.html'
				}
			},
		})
		.state('docs', {
			url: '/docs',
			views: {
				'menu': {templateUrl: 'src/views/docs/menu.html'}
			},
		})
}]);

"use strict";

requirejs.config({
	baseUrl: './',
	catchError: false,
	paths: {
		beril: 'build/beril',
		lodash: 'bower_components/lodash/lodash',
		three: 'bower_components/three.js/build/three'
	},
	shim: {
		beril: {
			deps: ['lodash', 'three'],
			exports: 'Beril'
		},
		lodash: {
			exports: '_'
		},
		three: {
			exports: 'THREE'
		}
	}
});

"use strict";

define('basic', function(require){
	return function(){
		var Beril = require('beril'),
			application = new Beril.Application();
		application.init({
			mode: require('./mode')
		});
		application.run();
		console.log("basic example");
	}
});

"use strict";

define(['beril'], function(Beril){
	return class extends Beril.ApplicationMode{
		constructor(){
			super([Beril.ThreeRenderSystem]);
		}

		setUpRenderSystem(system){
			system.container = document.getElementById('container');
			system.renderer.antialias = true;
		}
	}
})

define(function(require){
	return function(){
		console.log("test asdasdexample");
	}
});
