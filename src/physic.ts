export enum ForceDuration{
	ONCE = 0,
	INFINITE = 1,
	CALCULATED = 2
}

export class Force{
	vector: THREE.Vector3 
	power: number;
	change: number;
	duration: ForceDuration;
	name: string;
	id: number;

	constructor(params){
		_.assign(this, params);
	}
}