"use strict";

Beril.Component = class{
	constructor(){
		this.id = Beril._componentIndex++;
		this.type = "basic";
		this.entity = null;
	}
};
