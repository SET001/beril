class ShadersHelper{
	path: string = 'shaders';
	loader: THREE.XHRLoader = new THREE.XHRLoader();
	foo( shaderStr ) {
    return shaderStr.replace( /#include\s+\<(\S+)\>/gi, function( match, p1 ){
      var chunk = THREE.ShaderChunk[ p1 ];
      return chunk ? chunk : "";
     });
  }

	load(shaders: string[]){
		for(var shaderName of shaders){
			this.loader.load(this.path + '/' + shaderName + '_frag.glsl', (response) => {
				THREE.ShaderChunk[shaderName+'_fragment'] = this.foo(response);
			});
			this.loader.load(this.path + '/' + shaderName + '_vert.glsl', (response) => {
				THREE.ShaderChunk[shaderName+'_vertex'] = this.foo(response);
			});
		}
	}

}


export var shadersHelper = new ShadersHelper();