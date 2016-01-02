"use strict";
Beril.TranslationComponent = class extends Beril.Component{
	constructor(){
		super();
		this.type = 'translation';
		this.position = new THREE.Vector3();
		this.scale = new THREE.Vector3();
		this.rotation = new THREE.Vector3();
	}
}
