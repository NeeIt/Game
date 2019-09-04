class Game{
	constructor(){
		this.world = new World(30,17);
		this.camera = new World.Camera(15*this.world.blockSize,13*this.world.blockSize,this.world);
	}

	update(){
		this.camera.update();
		this.world.update();
	}
	reset(){
		this.world=new World(30,17);
	}
}
class World{
	constructor(colls,rows){
		this.x=0;
		this.y=0;
		this.player=new World.Player(50,80,15,25);
		this.backgroundColor="gray";
		this.gravity=0.5;
		this.friction=0.8;
		this.colls=colls;
		this.rows=rows;
		this.blockSize=15;
		this.collider = new World.Collider();
		this.textures= new World.TexturePack(15,20);
		this.textures.image.src="textures.png";
		this.bgMap=[
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,67 ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,68 ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,67 ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,68 ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,61 ,72 ,71 ,72 ,71 ,72 ,71 ,72 ,71 ,72 ,71 ,62 ,   ,   ,   ,   ,   ,   ,67 ,   ,   ,   ,   ,   ,   ,   ,
		,   ,61 ,72 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,71 ,62 ,   ,   ,   ,   ,68 ,   ,   ,   ,   ,   ,   ,   ,
		,   ,68 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,69 ,   ,   ,   ,   ,67  ,   ,   ,   ,   ,   ,   ,   ,
		,   ,67 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,70 ,   ,   ,   ,   ,68 ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,72 ,71 ,72 ,71 ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,65 ,   ,   ,   ,   ,   ,   ,66 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,63 ,   ,   ,   ,   ,64 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,68 ,   ,   , 69,   ,  ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,63 ,65 ,66 ,64 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 20 ,20 ,20 ,20 ,20 ];
		this.map=[
		5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,6  ,68 ,   ,   ,   ,   ,   ,   ,   ,
		5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,6  ,68 ,   ,   ,   ,   ,   ,   ,   ,
		5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,6  ,68 ,   ,   ,   ,   ,   ,   ,   ,
		5  ,5  ,5  ,12 ,8  ,8  ,8  ,8  ,8  ,8  ,8  ,8  ,8  ,8  ,8  ,8  ,13 ,5  ,5  ,5  ,5  ,6  ,67 ,   ,   ,   ,   ,   ,   ,   ,
		5  ,12 ,8  ,9  ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,7  ,8  ,13 ,5  ,5  ,6  ,68 ,   ,   ,   ,   ,   ,   ,   ,
		5  ,6  ,61 ,72 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,71 ,62 ,4  ,5  ,5  ,6  ,67 ,   ,   ,   ,   ,   ,   ,   ,
		5  ,6  ,68 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,69 ,4  ,5  ,5  ,6  ,68 ,   ,   ,   ,   ,   ,   ,   ,
		8  ,9  ,67 ,   ,   ,   ,   ,   ,124,125,126,   ,   ,   ,   ,   ,   ,70 ,7  ,8  ,8  ,9  ,67 ,   ,   ,   ,   ,   ,   ,   ,
		71 ,72 ,   ,   ,   ,   ,   ,   ,127,128,   ,   ,   ,   ,   ,   ,   ,   ,72 ,71 ,72 ,71 ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,65 ,46 ,129,130,131,   ,47,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,
		22 ,22 ,22 ,22 ,22 ,22 ,3  ,41,42 ,41 ,41 ,42 ,41,1  ,22 ,22 ,22 ,22 ,22 ,22 ,22 ,22 ,22 ,22 ,23 ,   ,   ,   ,   ,   ,
		5  ,5  ,5  ,5  ,5  ,5  ,14 ,3  ,45,   ,   ,45,1  ,15 ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,26 ,   ,   ,   ,   ,   ,
		5  ,5  ,5  ,5  ,5  ,5  ,5  ,6  ,45,   ,   ,45,4  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,26 ,   ,   ,   ,   ,   ,
		5  ,5  ,5  ,5  ,5  ,5  ,5  ,14 ,2  ,2  ,2  ,2  ,15 ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,26 ,   ,   ,   ,   ,   ,
		5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,26 ,   ,   ,   ,   ,   ,
		5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,26 ,   ,   ,   ,   ,   ,
		5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,26 ,   ,   ,   ,   ,   ];
		//lbrt 
		this.collMap=[
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,2  ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,2  ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,2  ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,   ,   ,   ,   ,   ,2  ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,4  ,6  ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,12 ,4  ,   ,   ,   ,2  ,   ,   ,   ,   ,   ,   ,   ,   ,
		,2  ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,8  ,   ,   ,2  ,   ,   ,   ,   ,   ,   ,   ,   ,
		,2  ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,8  ,   ,   ,2  ,   ,   ,   ,   ,   ,   ,   ,   ,
		4   ,6  ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,12 ,4  ,4  ,6  ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,
		1   ,1  ,1  ,1  ,1  ,1  ,3  ,16   ,16   ,16   ,16   ,16   ,16   ,9  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,3  ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,3  ,   ,   ,   ,   ,9  ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,2  ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,2  ,   ,   ,   ,   ,8  ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,2  ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,1  ,1  ,1  ,1  ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,2  ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,2  ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,2  ,   ,   ,   ,   ,   ,
		,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,2  ,-1 ,-1 ,-1 ,-1 ,-1 ];
		this.height=this.blockSize*this.rows;
		this.width=this.blockSize*this.colls;

	}

	update(){
		this.player.velocityY+=this.gravity;
		this.player.velocityX*=this.friction;
		
		this.player.update();
		this.collides(this.player);
	}

	setBackgroundColor(color){
		this.backgroundColor=color;
	}

	collides(object){
		if(object.x<0){
			object.x=0;object.velocityX=0;
		}else if(object.x+object.width>this.width){
			object.x=this.width-object.width;
			object.velocityX=0;
		}
		if(object.y<0){
			object.y=0;
			object.velocityY=0;
		}else if(object.y+object.height>this.height){
			object.y=this.height-object.height;
			object.velocityY=0;object.isJumping=false;
		}

		let block,bottom,top,right,left;
		let height,width;

		width=Math.ceil((object.width+1)/this.blockSize);
		height=Math.ceil((object.height+1)/this.blockSize);

		for(let w=0;w<width;w++){
			for(let h=0;h<height;h++){
				//Найти координаты каждого угла
		//Поделив на размер ячеек мы найдем не координату, а ячейку
		left  =	Math.floor(object.Left  / this.blockSize+w);
		top	  =	Math.floor(object.Top   / this.blockSize+h);
		bottom=	Math.floor(object.Bottom  / this.blockSize-h);
		right =	Math.floor(object.Right / this.blockSize-w);

		//Получили ячейку
		block = this.collMap[top*this.colls+left];
		//По ячейке смотрим, что делать
		this.collider.collide(block,object,left*this.blockSize,top*this.blockSize,this.blockSize);
		///////////////
		block = this.collMap[top*this.colls+right];
		this.collider.collide(block,object,right*this.blockSize,top*this.blockSize,this.blockSize);
		/////////////////
		block = this.collMap[bottom*this.colls+left];
		this.collider.collide(block,object,left*this.blockSize,bottom*this.blockSize,this.blockSize);
		////////////	
		block = this.collMap[bottom*this.colls+right];
		this.collider.collide(block,object,right*this.blockSize,bottom*this.blockSize,this.blockSize);
			}

		}
		



	}
}

World.Camera = class Camera{
	constructor(w,h,world){
		this.x=0;
		this.y=0;
		this.width=w;
		this.height=h;
		this.world=world;
	}
	update(){

		if(this.x<this.world.x){
			this.x=this.world.x;
		}
		else if(this.x+this.width>this.world.width){
			this.x=this.world.width-this.width;
		}
		if(this.y+this.height>this.world.height){
			this.y=this.world.height-this.height;
		}
		else if(this.y<this.world.y){
			this.y=this.world.y;
		}
		this.x=Math.round(this.x);
		this.y=Math.round(this.y);
	}
}
World.Collider = class Collider{
	constructor(){}
	collide(value,object,tx,ty,size){
		if(value===undefined)return;
		this.value=value;
		this.y=ty;

		switch(value){

			case 1:case 16:this.collideTop(object,ty);break;
			case 2: this.collideRight(object,tx+size);break;	
			case 3: if(this.collideTop(object,ty))return;
					this.collideRight(object,tx+size);break;
			case 4: this.collideBottom(object,ty+size);break;
			case 6: if(this.collideBottom(object,ty+size))return;
					this.collideRight(object,tx+size);break;
					
			case 8: this.collideLeft(object,tx);break;
			case 9: if(this.collideTop(object,ty))return;
					this.collideLeft(object,tx);break;
			case 12: if(this.collideBottom(object,ty+size))return;
					this.collideLeft(object,tx);break;

		}
	}
	collideTop(obj,top){

		if(obj.Bottom>top&&obj.OldBottom<=top){
			obj.Bottom = top-0.01;
			obj.velocityY=0;
			obj.isJumping=false;
			return true;
		}
		return false;
	}
	collideRight(obj,right){

		
		if(obj.Left<right&&obj.OldLeft>=right){
			obj.Left=right;
			obj.velocityX=0;
			return true;
		}
		return false;
	}
	collideBottom(obj,bottom){

		if(obj.Top<bottom&&obj.OldTop>=bottom){
			obj.Top= bottom;
			obj.velocityY=0;
			
			return true;
		}
		return false;
	}
	collideLeft(obj,left){
		
		if(obj.Right>left&&obj.OldRight<=left){
			obj.Right=left-0.01;
			obj.velocityX=0;
			return true;
		}
		return false;
	}
}
World.Object= class Object{
	constructor(x,y,w,h){
		this.width=w;
		this.height=h;
		this.x=x;
		this.xOld=x;
		this.y=y;
		this.yOld=y;	
	}
	get Bottom(){return this.y+this.height}
	get Left(){return this.x}
	get Right(){return this.x+this.width}
	get Top(){return this.y}

	get OldBottom(){return this.yOld+this.height}
	get OldLeft(){return this.xOld}
	get OldRight(){return this.xOld+this.width}
	get OldTop(){return this.yOld}

	set Bottom(y){this.y=y-this.height}
	set Top(y){this.y=y}
	set Left(x){this.x=x}
	set Right(x){this.x=x-this.width}

	set OldBottom(y){this.yOld=y-this.height}
	set OldTop(y){this.yOld=y}
	set OldLeft(x){this.xOld=x}
	set OldRight(x){this.xOld=x-this.width}

}
World.Player = class Player extends World.Object{
	constructor(x,y,w,h){
		super(x,y,w,h)

		this.velocityX=0;
		this.velocityY=0;
		this.isJumping=true;
		this.color='#abcdef';
	}

	update(){
		this.xOld=this.x;
		this.yOld=this.y;
		this.x+=this.velocityX;
		this.y+=this.velocityY;
	}
	moveLeft(){this.velocityX-=0.3;}
	moveRight(){this.velocityX+=0.3;}
	jump(){
		if(!this.isJumping){
			this.isJumping=true;
			this.velocityY-=10;
		}
	}
}
World.TexturePack = class TexturePack{
	constructor(size,colls){
		this.image = new Image();
		this.size=size;
		this.colls = colls;
	}
}
World.SpritesPack = class SpritesPack extends World.TexturePack{
	constructor(size,colls){
		super(size,colls)
	}
}