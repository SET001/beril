"use strict";

Beril.RotationComponent = class extends Beril.Component{
	constructor(){
		super();
		this.type = 'rotation';
		this.object = new THREE.Euler();
	}
};
