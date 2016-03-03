import core = require('../core');

export class StatsSystem extends core.System{
	type = 'stats';
	stats: Stats;

	init(){
		this.stats = new Stats();
		this.stats.setMode(0);
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.right = '0px';
		this.stats.domElement.style.top = '0px';
		document.getElementById('container').appendChild(this.stats.domElement);
		this.initialized.resolve();
	}
	
	run(){
		this.stats.begin();
		this.stats.end();
	}
}