import core = require('./core');
import {BasicApplication} from './application';

export function application(name: string, systems?: Array< {new():core.System} >, controller?: Function):BasicApplication{
	var application: BasicApplication;
	if (systems){
		application = new BasicApplication(name, systems);
		core._applications.push(application);
	} else {
		application = <core.Application> _.find(core._applications, { name: name });
	}
	return application;
}
