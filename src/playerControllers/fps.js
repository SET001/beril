"use strict";

Beril.FPSPlayerController = class{
	constructor(){
		// this.mesh = this.entity.renderComponent.object;
	}

	mouseUp(actions){
		this.component.entity.components.camera.object.rotation.x += this.component.mouseSpeed*Math.abs(actions.mouseUp);
	}

	mouseDown(actions){
		this.component.entity.components.camera.object.rotation.x -= this.component.mouseSpeed*Math.abs(actions.mouseDown);
	}

	mouseLeft(actions){
		this.component.entity.components.rotation.object.y += this.component.mouseSpeed*Math.abs(actions.mouseLeft);
	}

	mouseRight(actions){
		this.component.entity.components.rotation.object.y -= this.component.mouseSpeed*Math.abs(actions.mouseRight);
	}

	mouseWheel(movement){}

	moveForward(actions){
		var speed = actions.Shift ? this.component.runingSpeed : this.component.movingSpeed;
		console.log("moving forward", speed);
		this.component.entity.components.translation.position.x += speed/100;
	}

	moveBackward(actions){
		var speed = actions.Shift ? this.component.runingSpeed : this.component.movingSpeed;
		console.log("moving forward", speed);
		this.component.entity.components.translation.position.x -= speed/100;
	}

	moveLeft(actions){

	}

	moveRight(actions){

	}

	jump(){
		console.log("jumping");
	}
	shoot(){
	}
};
