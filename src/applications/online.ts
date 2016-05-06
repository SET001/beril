import {BasicApplication} from './basic';
import core = require('../core');
import entities = require('../entities');
import injector = require('../di');

class ServerConnector{
	isConnected: Boolean = false;
	onPlayerUpdate: Function;	// for player info updates
	onItemAdd: Function;	// for chunk updates
	onItemRemove: Function;	// for chunk updates
	onItemUpdate: Function;	// for chunk updates
	onNotice: Function;				// for anything else
	onConnect: Function;
	socket: any;
	connect(settings):Q.Promise<any>{
		var defer = Q.defer();

		this.socket = io.connect(`http://${settings.host}:${settings.port}`);

		this.socket.on('connect', () => {
			this.isConnected = true;
			defer.resolve();
			if (this.onConnect) this.onConnect();
		});
		
		this.socket.on('itemAdd', (item) => {
			if (this.onItemAdd) this.onItemAdd(item);
		});

		this.socket.on('itemUpdate', (item) => {
			if (this.onItemUpdate) this.onItemUpdate(item);
		});

		this.socket.on('itemRemove', (item) => {
			if (this.onItemRemove) this.onItemRemove(item);
		});
		return defer.promise;
	}

	register(user){
		this.socket.emit('register', {login: user.login, password: user.password});
	}

	login(){

	}
}

class OnlineAppDefaults implements core.AppDefaults{
	pawn = entities.Player;
	scene = 'scene1';
	server = {
		login: '',
		password: '',
		host: '127.0.0.1',
		port: 8080
	}
}

export class OnlineApplication extends BasicApplication{
	defaults: OnlineAppDefaults = new OnlineAppDefaults();
	settings: OnlineAppDefaults;
	server: ServerConnector = new ServerConnector();


	constructor(systems?: Array< {new():core.System} >, config?: OnlineAppDefaults){
		super(systems);
		_.assign(this.settings, config, this.defaults);
		
	}

	// _run(controller?: Function){
	// 	this.setPawn();
	// 	this.running = true;
	// 	this.connect().then(() => {
	// 		if (controller){
	// 			injector.resolve(controller, this)();
	// 		}
	// 		this.looper();
	// 	});
	// 	// window.requestAnimationFrame(this.looper.bind(this));
	// }

	connect(){
		this.server.onPlayerUpdate = (update) => {

		}

		this.server.onItemRemove = (item) => {
			this.removeObject(item);
		}

		this.server.onItemUpdate = (itemInfo) => {
			var item = _.find(this.items, {_id: itemInfo._id});
			if (item){
				if (itemInfo.position)
					item.get('position').object.set(itemInfo.position.x, itemInfo.position.y, itemInfo.position.z);
				if (itemInfo.rotation)
					item.get('rotation').object.set(itemInfo.rotation.x, itemInfo.rotation.y, itemInfo.rotation.z);
				item.get('mesh').object.__dirtyPosition = true;
			} else {
				console.error('can`t update object', itemInfo);
			}
		}

		this.server.onItemAdd	 = (itemInfo) => {
			var item = _.find(this.items, {_id: itemInfo._id});
			if (!item){
				try{
					item = eval ("new " + itemInfo.class + "({mass: 0})");
					item._id = itemInfo._id;
					this.addObject(item);
				} catch (e) {
					console.error(e);
				}
			}
		}

		return this.server.connect(this.settings.server);
	}

}