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
