var through = require('through2'),
  path = require('path'),
  gutil = require('gulp-util');

module.exports = function(destFile){
  var firstFile, commonBase;
  var shaders = {};

  return through.obj(function(file, encoding, callback) {
    var buffer = '';

    if(!firstFile) {
      firstFile = file;
      commonBase = file.base;
    }
    var shaderName = path.basename(file.path).split('.')[0];
    // if (typeof shaders[shaderName] === 'undefined'){
    //   shaders[shaderName] = {};
    // }
    var foo = [];
    var bar = file.contents.toString().split('\n');
    for(var i in bar){
      var str = (bar[i] ? '\n\t"' + bar[i] + '"' : "").replace("'", "\'");
      foo.push(foo.length && str ? ',' + str : str);
    }

    shaders[shaderName] = foo.join('');
    
    for (var shaderName in shaders){
      buffer += 'THREE.ShaderChunk.' + shaderName + ' = [';
      buffer += shaders[shaderName] + '].join("\\n")';
      buffer += ';\n';
    }

    var cf = new gutil.File({
      path: path.join(firstFile.base, destFile),
      contents: new Buffer(buffer)
    });
    this.push(cf);
    callback();
  });
}