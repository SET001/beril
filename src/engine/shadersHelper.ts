class ShadersHelper{
	path: string = 'shaders';
	loader: THREE.XHRLoader = new THREE.XHRLoader();
	foo( shaderStr ) {
    return shaderStr.replace( /#include\s+\<(\S+)\>/gi, function( match, p1 ){
      var chunk = THREE.ShaderChunk[ p1 ];
      return chunk ? chunk : "";
     });
  }

  _load(shader: string){
  	var path = this.path ? this.path + '/' + shader : shader;
		var shaderName = shader.split('.');
		if (shaderName.length) shaderName.pop();
		shaderName = shaderName.join('.');
		this.loader.load(path, (response) => {
			console.log("===>", shaderName);
			THREE.ShaderChunk[shaderName] = this.foo(response);
			// console.log(THREE.ShaderChunk[shaderName]);
		});
  }

	load(shaders: string[]){
		for(var shader of shaders){
			this._load(shader);
		}
	}

}


export var shadersHelper = new ShadersHelper();