class Controller{
	constructor(){
		this.up 	= new Key();
		this.left 	= new Key();
		this.right	= new Key();
		this.down	= new Key();
		this.space	= new Key();
		this.shift	= new Key();
		this.ctrl	= new Key();
	}
	keyupdown(event){
		let down = event.type=="keydown";
		
		switch(event.keyCode){

			/*W*/ case 87: /*Num8*/ case 104: /*^*/ case 38:
			this.up.action(down); break;

			/*A*/ case 65: /*Num4*/ case 100: /*<-*/ case 37:
			this.left.action(down); break;

			/*S*/ case 83: /*Num4*/ case 98: /*<-*/ case 40:
			this.down.action(down); break;

			/*D*/ case 68: /*Num4*/ case 102: /*<-*/ case 39:
			this.right.action(down); break;

			/*Space*/ case 32:
			this.space.action(down); break;

			/*Shift*/ case 16:
			this.shift.action(down); break;
			/*Ctrl*/ case 17:
			this.shift.action(down); break;
		}
	}
}

class Key{
	constructor(){
		this.isPress = false;
		this.isDown = false;	
	}
	action(status){
		if(this.isDown!=status)this.isDown=status;//changes once
		this.isPress=status;			
	}
}