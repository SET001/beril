"use strict";

Beril.PositionComponent = class extends Beril.Component{
	constructor(){
		super();
		this.type = 'position';
		this.object = new THREE.Vector3();
	}
};
