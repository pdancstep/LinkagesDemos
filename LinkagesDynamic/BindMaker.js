function MakeBinding(node1,node2){
    
    this.myStack = [node1,node2];
    this.dragging = false;

    // TODO: add error check to make sure at least 1 of the two nodes is free

    /////// can this section just be a call to this.amIFree?
    //
    // the stack is free iff both of its nodes are free
    this.free = node1.free && node2.free;
    // if the stack is bound, determine which node makes it bound
    if (!this.free){
	this.myBoundNodeIndex = node1.free ? 1 : 0;
    }
    //
    ///////

    // check if cursor is over this stack of nodes
    this.overMe = function(){
	this.over = this.myStack[0].overMe();
	return this.over;
    }

    // notify this stack that it has been clicked
    this.clickMe = function(){
	if (this.over && this.free){
	    this.dragging = true
	}
    }

    // ???
    this.allFalse = function(){
	this.dragging = false
    }
    
    // function to decide if updated binding is free
    this.amIFree = function(){
  	//assume to be free...
  	this.free = true
  	//then check for exceptions...
  	for (i=0; i<this.myStack.length; i++){
  	    if (!this.myStack[i].free){
  		this.free = false;
  		this.myBoundNodeIndex = i;
  	    }
  	}
    }

    // ???
    this.reverseBinding = function(){
  	if (this.over && !this.free){
	    //top level reversal boolean
	    reversingOperator = true;
	    //local reversal boolean
	    this.beingReversed = true;
  	}
    }

    // update the position of each node in the stack
    this.update = function(){
	
	if (this.dragging){
	    this.myStack[0].setRealPx(mouseX);
	    this.myStack[0].setImaginaryPx(mouseY);
	}

	// in free bindings, everything follows the top node;
	// in bound bindings, everything follows the bound node
	var follow = this.free ? 0 : this.myBoundNodeIndex;
	
	var realp = this.myStack[follow].getReal();
	var imagp = this.myStack[follow].getImaginary();

	for (node of this.myStack){
	    node.setReal(realp);
	    node.setImaginary(imagp);
	}
    }

    // display this stack
    // why doesn't this call this.myStack[0].display()? -J
    this.display = function(){
	fill(0,255,0,150);
	noStroke();
	ellipse(this.myStack[0].getRealPx(),
		this.myStack[0].getImaginaryPx(), 15, 15);
	//fill(255);
	//text(node2.free,
	//     this.myStack[0].getRealPx(),
	//     this.myStack[0].getImaginaryPx()+10);
	if(this.free){
	    noFill();
	    stroke(255,200);
	    strokeWeight(3);
	    ellipse(this.myStack[0].getRealPx(),
		    this.myStack[0].getImaginaryPx(),
		    20, 20);
	}
    }
}
