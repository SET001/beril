requirejs.config({
	baseUrl: '/base/build/',
	paths: {
		// 'src/beril': 'sberil',
		// 'src/systems/threeRender': './systems/threeRender',
	},
	deps: [
	 	'/base/bower_components/three.js/build/three.js',
	 	'/base/bower_components/lodash/lodash.js',
	 	'/base/build/tests/pool.spec.js',
	 	'/base/build/tests/application.spec.js',
	 	'/base/build/tests/entity.spec.js',
	 	'/base/build/tests/component.spec.js',
	 	'/base/build/tests/system.spec.js',
	 	'/base/build/tests/di.spec.js',
	],
	callback: window.__karma__.start
});