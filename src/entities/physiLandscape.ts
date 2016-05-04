import core = require('../core');
import components = require('../components');
import materials = require('../materials');
import {Landscape} from './landscape';


class LandscapeConfig{
	heightMap: string = ''
	blendMap: string = ''
	width: number = 1000
	length: number = 1000
	widthSegments: number = 596
	lengthSegments: number = 596
	textures: string[]
}

interface PhysiLandscapeConfig{
	heightMap: string;
	blendMap: string;
	textures: string[];
}

export class PhysiLandscape extends Landscape{

	constructor(config: PhysiLandscapeConfig){
		super(config);
	}

	setUpMesh(component){
		var defer = Q.defer();
		console.log(this.config);
		this.load([
			this.config.blendMap,
			this.config.heightMap]
			.concat(this.config.textures))
		.then((resources) => {

			var image = resources[1].value.image;
			var canvas = document.createElement( 'canvas' );
			canvas.width = image.width;
			canvas.height = image.height;

			var context = canvas.getContext( '2d' );
			context.drawImage( image, 0, 0 );

	    var heightMap = context.getImageData( 0, 0, image.width, image.height );
			var geometry = new THREE.PlaneGeometry(
				// 1000, 1000, 100, 100
				this.config.width,
				this.config.length,
				image.width-1,
				image.height-1
			);
			for ( var i = 1; i < geometry.vertices.length; i ++ ) {
				var vertex = geometry.vertices[i];
				vertex.z = heightMap.data[i*4]/2;
				// console.log(heightMap.data[i]);
			}
			geometry.computeFaceNormals();
			geometry.computeVertexNormals();



			var landscapeMat = new materials.LandscapeMaterial({
				blendMap: resources[0].value,
				textures: resources.slice(2),
				scale: 200
			});
			// var landscapeMat = new THREE.MeshLambertMaterial({ color: 0xff0000});
			var material = Physijs.createMaterial(
				landscapeMat,
				1, // high friction
				0 // low restitution
			);
			component.object = new Physijs.HeightfieldMesh(
				geometry,
				material,
				0, // mass,
				image.width-1,
				image.height-1);
			component.object.name = 'PhysiLandscape';
			component.object.receiveShadow = true;
			component.object.castShadow = true;
			component.object.rotation.x = -Math.PI / 2;
			
			// geometry.verticesNeedUpdate = true;
			// component.object.verticesNeedUpdate = true;

			

			// var scale = 150;
			// component.object.scale.x = scale;
			// component.object.scale.y = scale;
			// component.object.scale.z = scale;
			defer.resolve();
		}).done();

		return defer.promise;
	}
	
}