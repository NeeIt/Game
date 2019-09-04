
const canvas = document.getElementById('canvas');
/////////////////Keys Class///////////////////
const game = new Game();//
//////////////////////////////////////////////
//////////Display Class////////////////////
const display = new Display(canvas,game.camera);///////
///////////////////////////////////////////
function render(){

	display.backgroundColor = "white";
	display.drawBg2(game.world.textures.image,0,300,300,300,4);
	display.drawBg2(game.world.textures.image,0,600,300,150,2,true);
	display.drawMap(game.world.map,game.world.colls,game.world.blockSize,game.world.textures);
	display.drawRect(game.world.player.x,game.world.player.y,game.world.player.width,game.world.player.height,game.world.player.color);
	display.drawMap(game.world.bgMap,game.world.colls,game.world.blockSize,game.world.textures);
	display.render();

}
function resize(){
	display.resize(window.innerWidth-32,window.innerHeight-32,display.camera.width/display.camera.height)

}

/////////////////Keys Class///////////////////
const controller = new Controller();//////////
//////////////////////////////////////////////

function keyupdown(event){
	controller.keyupdown(event);
}
function update(){
	if(controller.left.isPress)game.world.player.moveLeft();
	if(controller.right.isPress)game.world.player.moveRight();
	if(controller.up.isPress){game.world.player.jump();}

	if(game.world.collider.value==-1 &&game.world.collider.y>=game.world.player.Bottom-game.world.player.height/2)game.reset();	
	if(game.world.collider.value==16&&controller.down.isPress &&game.world.collider.y==game.world.player.Bottom+0.01)game.world.player.Bottom+=1;

	game.camera.x=game.world.player.x-game.camera.width/2+game.world.player.width/2;
	game.camera.y=game.world.player.y-game.camera.height/2+game.world.player.height/2;
	
	game.update();
}
/////////////////Keys Class///////////////////
const engine = new Engine(render,update,60);//
//////////////////////////////////////////////




window.addEventListener('resize',resize);
window.addEventListener('keyup',keyupdown);
window.addEventListener('keydown',keyupdown);

resize();
engine.start();
display.buffer.canvas.width=game.camera.width;
display.buffer.canvas.height=game.camera.height;
render();


let buttonPause = document.createElement('button');
buttonPause.textContent="Pause";
buttonPause.style.cssText="position:absolute;top:20px;left:20px";
buttonPause.addEventListener('click',function(){

	if(engine.mode=="pause"){
		game.world.textures.image.src="textures.png";
		engine.start()
	}
	else{
		game.world.textures.image.src="textures_bw.png";
		setTimeout(()=>engine.stop(),100);
	}


})
document.body.append(buttonPause);
let resetButton= document.createElement('button');
resetButton.textContent="Reset";
resetButton.style.cssText="position:absolute; top:20px; left:"+81+"px";

resetButton.addEventListener('click',function(){

	game.reset();
})
document.body.append(resetButton);