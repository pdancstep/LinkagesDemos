

function MakeBinding(node1,node2){

	this.myStack = [node1,node2]
	this.dragging = false

	if(node1.free&&node2.free){
		this.free = true
	}else{
		this.free = false
		if(!node1.free){
			this.myBoundNodeIndex = 0
		}else{
			this.myBoundNodeIndex = 1
		}
	}

	this.overMe = function(){
		if(dist(mouseX,mouseY,global2StageX(this.myStack[0].real),global2StageY(this.myStack[0].imaginary))<25){
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

	this.allFalse = function(){
	    this.dragging = false
  	}

  	//function to decide if updated binding is free
  	this.amIFree = function(){
  		//assume to be free...
  		this.free = true
  		//then check for exceptions...
  		for(i=0;i<this.myStack.length;i++){
  			if(!this.myStack[i].free){
  				this.free = false 
  				this.myBoundNodeIndex = i
  			}
  		}
  	}

  	this.reverseBinding = function(){
  		if(this.over&&!this.free){
	  		//top level reversal boolean
	        reversingOperator = true
	        //local reversal boolean
	        this.beingReversed = true
  		}
  	}


	this.update = function(){

		if(this.dragging){
			this.myStack[0].real = stage2GlobalX(mouseX)
			this.myStack[0].imaginary = stage2GlobalY(mouseY)
		}


		//in free bindings, everything follows the top node...
		if(this.free){
			for(i=1;i<this.myStack.length;i++){
				this.myStack[i].real = this.myStack[0].real
				this.myStack[i].imaginary = this.myStack[0].imaginary
			}
		//in bound bindings, everything follows the bound node...
		}else{
			for(i=0;i<this.myStack.length;i++){
				if(i!=this.myBoundNodeIndex){
					this.myStack[i].real = this.myStack[this.myBoundNodeIndex].real
					this.myStack[i].imaginary = this.myStack[this.myBoundNodeIndex].imaginary
				}
			}
		}
	}


	this.display = function(){
		fill(0,255,0,150)
		noStroke()
		ellipse(global2StageX(this.myStack[0].real),global2StageY(this.myStack[0].imaginary),15,15)
		//fill(255)
		//text(node2.free,global2StageX(this.myStack[0].real),global2StageY(this.myStack[0].imaginary)+10)
		if(this.free){
	      noFill()
	      stroke(255,200)
	      strokeWeight(3)
	      ellipse(global2StageX(this.myStack[0].real),global2StageY(this.myStack[0].imaginary),20,20)
		}
	}


}


