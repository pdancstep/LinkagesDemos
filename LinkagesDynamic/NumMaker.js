function MakeNumber(xPos,yPos,free){
    
    this.real = xPos;
    this.imaginary = yPos;
    
    // free means it has a manipulable controller over it...
    this.free = free
    
    // boolean for whether this number is involved in a binding...
    this.inStack = false
    
    this.dragging = false
    
    // boolean for whether this is under mouse
    this.over = false	

    // check whether this is under mouse
    this.overMe = function(){
	if (dist(mouseX, mouseY, this.real, this.imaginary) < 25){
	    this.over = true
	}else{
	    this.over = false
	}
	return this.over;
    }

    // notify this point that it has been clicked
    this.clickMe = function(){
	if (this.over && this.free && !this.inStack){
	    this.dragging = true
	}
	// where does this.dragging get turned back off?
    }

    // if we're dragging this point, move its location to the mouse's location
    this.update = function(){
	if (this.dragging){
	    this.real = mouseX;
	    this.imaginary = mouseY;
	}	
    }

    // draw this point
    this.display = function(){
	if (!this.inStack){
	    noStroke();
	    ellipse(this.real, this.imaginary, 15, 15);
	    
	    //node ring indicating draggability...
	    if (this.free){
		noFill()
		stroke(255,200)
		strokeWeight(3)
		ellipse(this.real, this.imaginary, 20, 20)
	    }
	}
    }

    // ???
    this.freeNodeDisplay = function() {
	fill(255)
	noStroke()
	ellipse(this.real, this.imaginary, 15, 15)
    }

    // wrappers for checking and setting coordinates, either with respect to stage (default) or global
    this.getReal = function() { return this.real; }
    this.getRealGlobal = function() { return stage2GlobalX(this.real); }
    this.getImaginary = function() { return this.imaginary; }
    this.getImaginaryGlobal = function() { return stage2GlobalY(this.imaginary); }

    this.setReal = function(x) { this.real = x; }
    this.setRealGlobal = function(x) { this.real = global2StageX(x); }
    this.setImaginary = function(y) { this.imaginary = y; }
    this.setImaginaryGlobal = function(y) { this.imaginary = global2StageY(y); }

    this.addGlobal = function(x,y) {
	// global<->stage is just a linear translation, so we don't actually need to convert anything
	this.real += x;
	this.imaginary += y;
    }
}
