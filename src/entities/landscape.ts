import core = require('../core');
import components = require('../components');
import materials = require('../materials');

class LandscapeConfig{
	heightMap: string = ''
	blendMap: string = ''
	width: number = 3000
	length: number = 3000
	widthSegments: number = 200
	lengthSegments: number = 200
	textures: string[]
}

export class Landscape extends core.Entity{
	config: LandscapeConfig = new LandscapeConfig()
	loader: THREE.TextureLoader

	constructor(config?: LandscapeConfig){
		super();
		if (config){
			_.assign(this.config, config);
		}
		this.addComponents = [
			components.RotationComponent,
			components.PositionComponent,
			components.ScaleComponent,
			components.RenderComponent,
			components.MeshComponent,
		];
		this.loader = new THREE.TextureLoader();
	}

	load(param: string);
	load(param: string[]);

	load(param: any):Q.Promise<any>|Q.Promise<any>[]{
		if (param instanceof Array){
			var foo: Q.Promise<any>[] = [];
			for (var i of param){
				foo.push(this.load(i));
			}
			return Q.allSettled(foo);
		} else {
			var defer = Q.defer();
			this.loader.load(param, function(texture: THREE.Texture){
				defer.resolve(texture);
			}, function(){

			}, function(error){
				defer.reject(error);
			});
			return defer.promise;
		}
	}

	setUpMesh(component){
		var defer = Q.defer();
		this.load([
			this.config.blendMap,
			this.config.heightMap]
			.concat(this.config.textures))
		.then((resources) => {

			console.log("===>", resources[1].value);
			var image = resources[1].value.image;
			var canvas = document.createElement( 'canvas' );
			canvas.width = image.width;
			canvas.height = image.height;

			var context = canvas.getContext( '2d' );
			context.drawImage( image, 0, 0 );

	    var heightMap = context.getImageData( 0, 0, image.width, image.height );
	    console.log("heightmap data", heightMap);

			var geometry = new THREE.PlaneGeometry(
				this.config.width,
				this.config.length,
				this.config.widthSegments,
				this.config.lengthSegments);
			// heightMap: resources[1].value,
			var material = new materials.LandscapeMaterial({
				blendMap: resources[0].value,
				textures: resources.slice(2),
				scale: 200
			});
			component.object = new THREE.Mesh(geometry, material);
			component.object.receiveShadow = true;
			component.object.castShadow = true;
			component.object.rotation.x = -Math.PI / 2;

			var scale = 150;
			component.object.scale.x = scale;
			component.object.scale.y = scale;
			component.object.scale.z = scale;
			defer.resolve();
		}).done();

		return defer.promise;
	}
	
}