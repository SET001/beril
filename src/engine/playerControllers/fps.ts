import beril = require('../beril');

export class FPSPlayerController{
	mouseAcceleration: number = 0.01;
	moveSpeed: number = 0.5;
	component: beril.Component;

	mouseWheel(foo){
		this.component.entity.get('camera').object.translateZ(foo.mouseWheel/Math.abs(foo.mouseWheel));
	}

	mouseUp(foo){
		var camera = this.component.entity.get('camera');
		camera.object.rotation.x += this.mouseAcceleration*Math.abs(foo.mouseUp);
	}

	mouseDown(foo){
		var camera = this.component.entity.get('camera');
		camera.object.rotation.x -= this.mouseAcceleration*Math.abs(foo.mouseDown);
	}

	mouseLeft(foo){
		var camera = this.component.entity.get('mesh');
		camera.object.rotation.y += this.mouseAcceleration*Math.abs(foo.mouseLeft);
	}

	mouseRight(foo){
		var camera = this.component.entity.get('mesh');
		camera.object.rotation.y -= this.mouseAcceleration*Math.abs(foo.mouseRight);
	}

	moveForward(){
		this.component.entity.get('translation').object.position.z -= this.moveSpeed;
	}

	moveBackward(){
		this.component.entity.get('translation').object.position.z += this.moveSpeed;
	}

	moveLeft(){
		this.component.entity.get('translation').object.position.x -= this.moveSpeed;
	}

	moveRight(){
		this.component.entity.get('translation').object.position.x += this.moveSpeed;
	}
}