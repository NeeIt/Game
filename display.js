class Display{
	constructor(canvas,camera){
		this.context = canvas.getContext('2d');
		this.buffer = document.createElement('canvas').getContext('2d');
		this.camera = camera;

	}
	render(){
		this.context.drawImage(this.buffer.canvas,
			0,0,this.buffer.canvas.width,this.buffer.canvas.height,
			0,0,this.context.canvas.width,this.context.canvas.height)
	}
	resize(width,height,wh){
		if(width/height>wh){
			this.context.canvas.height=height;
			this.context.canvas.width=height*wh;
		}else{
			this.context.canvas.height=width/wh;
			this.context.canvas.width=width;
		}

		this.render();
	}
	/////////////////////
	set backgroundColor(color){
		this.buffer.fillStyle=color;
		this.buffer.fillRect(0,0,this.buffer.canvas.width,this.buffer.canvas.height);

	}
	drawBg(img,x,y,w,h){
		this.context.webkitImageSmoothingEnabled = false;
		this.context.mozImageSmoothingEnabled = false;
		this.context.imageSmoothingEnabled = false;
		this.buffer.drawImage(img,x,y,w,h,0,0,this.buffer.canvas.width,this.buffer.canvas.height);
	}
	drawRect(x,y,w,h,c){
		this.buffer.fillStyle=c;
		this.context.webkitImageSmoothingEnabled = false;
		this.context.mozImageSmoothingEnabled = false;
		this.context.imageSmoothingEnabled = false;
		this.buffer.fillRect(x-this.camera.x,y-this.camera.y,w,h);
	}
	drawBg2(img,x,y,w,h,d,r){
		this.x=0-this.camera.x/d;
		this.context.webkitImageSmoothingEnabled = false;
		this.context.mozImageSmoothingEnabled = false;
		this.context.imageSmoothingEnabled = false;
		this.buffer.drawImage(img,x,y,w,h,this.x,(r)?this.buffer.canvas.height-h:0,this.buffer.canvas.width,(r)?h%this.buffer.canvas.height:this.buffer.canvas.height);
		this.buffer.drawImage(img,x,y,w,h,this.x+this.buffer.canvas.width,(r)?this.buffer.canvas.height-h:0,this.buffer.canvas.width,(r)?h%this.buffer.canvas.height:this.buffer.canvas.height);
	}
	//		arr / 20
	drawMap(map,colls,blockSize,textures){
		
		let sourceX,sourceY,destinationX,destinationY,value;
		for(let i=map.length-1;i>-1;i--){

			destinationX = (i % colls)* blockSize;
			destinationY = Math.floor(i / colls)* blockSize;

			if(map[i] instanceof Array){
				for(let j=0;j<map[i].length;j++){
					value = map[i][j]

					sourceX = (value % textures.colls) * textures.size;
					sourceY = Math.floor(value / textures.colls) * textures.size;

					this.context.webkitImageSmoothingEnabled = false;
					this.context.mozImageSmoothingEnabled = false;
					this.context.imageSmoothingEnabled = false;

					this.buffer.drawImage(textures.image,sourceX,sourceY,textures.size,textures.size,destinationX-this.camera.x,destinationY-this.camera.y,blockSize,blockSize);
				}
			}else{
				value = map[i]

				if(isNaN(value))continue;
				sourceX = (value % textures.colls) * textures.size;
				sourceY = Math.floor(value / textures.colls) * textures.size;
				
				

				this.context.webkitImageSmoothingEnabled = false;
				this.context.mozImageSmoothingEnabled = false;
				this.context.imageSmoothingEnabled = false;

				this.buffer.drawImage(textures.image,sourceX,sourceY,textures.size,textures.size,destinationX-this.camera.x,destinationY-this.camera.y,blockSize,blockSize);
			}
		}

	}
}
