var dependencies: {} = {};

export function resetDI(){
	dependencies = {};
}

export function register(name: string, value: any){
	dependencies[name] = value;
}

export function resolve(func?: Function, scope?: any){
	var deps = func.toString().match(/^\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',');
	var args = [];
	
	for (var i=0; i<deps.length; i++){
		if (deps[i] in dependencies){
			args.push(dependencies[deps[i]]);
		}
	}
	return function(){
		func.apply(scope || {}, args);
	};
}