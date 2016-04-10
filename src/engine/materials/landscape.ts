import helpers = require('../shadersHelper');

interface LandscapeMaterialConfig{
	heightMap: any
	blendMap: any
	textures: any[]
	scale: number
}

export class LandscapeMaterial extends THREE.ShaderMaterial{

	constructor(config: LandscapeMaterialConfig){
		var uniforms = THREE.ShaderLib['lambert'].uniforms;
		uniforms.heightMap = { type: "t", value: config.heightMap};
		uniforms.blendMap = { type: "t", value: config.blendMap};
		uniforms.bumpScale = { type: "f", value: config.scale};
		for (var texture in config.textures){
			uniforms['channel'+texture] = { type: "t", value: config.textures[texture].value};
			uniforms['channel'+texture].value.wrapS = uniforms['channel'+texture].value.wrapT = THREE.RepeatWrapping;
		}
		console.log("uniforms: ===>", uniforms);
		var defines = {};
		super({
			name: "LandscapeShader",
			uniforms: uniforms,
			vertexShader: helpers.shadersHelper.foo(THREE.ShaderChunk.landscape_vert),
			fragmentShader: helpers.shadersHelper.foo(THREE.ShaderChunk.landscape_frag),
			lights: true,
			fog: true,
			// wireframe: true
		});
		this.lights = true;
		// this.color = 0xff0000;
		// this.ambientLightColor = 0x000000;
	}
}