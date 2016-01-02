Beril.PlayerCharacter = class extends Beril.GameObject{
	constructor(){
		super([
			Beril.PositionComponent,
			Beril.CameraComponent,
			Beril.InputComponent,
			Beril.CollisionComponent,
			Beril.PhysicComponent,
			// Beril.TranslationComponent
		]);
	}

	setUpCameraComponent(component){
		component.init('orthographic');
	}
}
