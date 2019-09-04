class Engine{
	constructor(render,update,fps){
		this.fps=1000/fps;
		this.timerId=0;
		this.lastFrameTime=0;
		this.nowTime=null;
		this.updated=false;

		this.render = render;
		this.update = update;
		this.handleRun = (stamp)=>this.run(stamp);
	}
	run(stamp){
		if(this.mode=="pause")return;
		this.lastFrameTime += stamp - this.nowTime;
		this.nowTime=stamp;
		

		if(this.lastFrameTime>=this.fps*3)
			this.lastFrameTime=this.fps;

		while(this.lastFrameTime>this.fps){
			this.lastFrameTime-=this.fps;
			this.update(stamp);
			this.updated=true;

		}

		if(this.updated){
			this.render(stamp);
			this.updated=false;
			
		}
		this.timerId=window.requestAnimationFrame(this.handleRun);
	}
	start(){
		this.mode="run";
		if(!this.timerId)
		this.timerId=window.requestAnimationFrame(this.handleRun);
	}
	stop(){
		this.mode="pause";
window.cancelAnimationFrame(this.timerId);
		this.timerId=undefined;
		
	}
}