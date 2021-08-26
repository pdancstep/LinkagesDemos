

function MakeNumber(xPos,yPos,free){

	this.real = xPos
	this.imaginary = yPos

	this.free = free


	this.dragging = false

	//boolean for whether this is under mouse
	this.over = false	


	this.overMe = function(){
		if(dist(mouseX,mouseY,global2StageX(this.real),global2StageY(this.imaginary))<25){
			this.over = true
		}else{
			this.over = false
		}
	}

	this.clickMe = function(){
		if(this.over&&this.free){
			this.dragging = true
		}
	}


	this.update = function(){
		if(this.dragging){
			this.real = stage2GlobalX(mouseX)
			this.imaginary = stage2GlobalY(mouseY)
		}
	}


	this.display = function(){
	}


}


