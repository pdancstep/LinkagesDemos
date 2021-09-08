

function MakeNumber(xPos,yPos,free){

	this.real = xPos
	this.imaginary = yPos

	//free means it has a manipulable controller over it...
	this.free = free


	//boolean for whether this number is involved in a binding...
	this.inStack = false

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
		if(this.over&&this.free&&!this.inStack){
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
		if(!this.inStack){
			noStroke()
			ellipse(global2StageX(this.real),global2StageY(this.imaginary),15,15)
			//node ring indicating draggability...
			if(this.free){
		      noFill()
		      stroke(255,200)
		      strokeWeight(3)
		      ellipse(global2StageX(this.real),global2StageY(this.imaginary),20,20)
			}
		}

	}

	this.freeNodeDisplay = function() {
		fill(255)
		noStroke()
		ellipse(global2StageX(this.real),global2StageY(this.imaginary),15,15)
	}




}


