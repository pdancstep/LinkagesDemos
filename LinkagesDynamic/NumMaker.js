function MakeNumber(xPos,yPos,free){
    
    this.real = xPos;
    this.imaginary = yPos;
    
    // free means it has a manipulable controller over it...
    this.free = free;
    
    // boolean for whether this number is involved in a binding...
    this.inStack = false;
    
    this.dragging = false;
    
    // boolean for whether this is under mouse
    this.over = false;

    // check whether this is under mouse
    this.overMe = function(){
	this.over = dist(mouseX,
			 mouseY,
			 axisToPixelX(this.real),
			 axisToPixelY(this.imaginary)) < 25;
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
	    this.real = pixelToAxisX(mouseX);
	    this.imaginary = pixelToAxisY(mouseY);
	}	
    }

    // draw the circle for this Number's coordinates
    this.drawNode = function() {
	noStroke();
	ellipse(axisToPixelX(this.real), axisToPixelY(this.imaginary), 15, 15);
    }

    // draw the encircling ring used to indicate free node draggability
    this.drawRing = function() {
	noFill();
	stroke(255,200);
	strokeWeight(3);
	ellipse(axisToPixelX(this.real), axisToPixelY(this.imaginary), 20, 20);
    }
    
    // externally-used display function
    this.display = function(){
	if (!this.inStack){
	    this.drawNode();
	    if (this.free){
		this.drawRing();
	    }
	}
    }

    // ???
    this.freeNodeDisplay = function() {
	fill(255);
	this.drawNode();
    }

    // wrappers for checking and setting coordinates
    this.getReal = function() { return this.real; }
    this.getRealPx = function() { return axisToPixelX(this.real); }
    this.getImaginary = function() { return this.imaginary; }
    this.getImaginaryPx = function() { return axisToPixelY(this.imaginary); }

    this.setReal = function(x) { this.real = x; }
    this.setRealPx = function(x) { this.real = pixelToAxisX(x); }
    this.setImaginary = function(y) { this.imaginary = y; }
    this.setImaginaryPx = function(y) { this.imaginary = pixelToAxisY(y); }

    this.shift = function(x,y) {
	this.real += x;
	this.imaginary += y;
    }
    this.shiftPx = function(x,y) {
	this.real = pixelToAxisX(axisToPixelX(this.real) + x);
	this.imaginary = pixelToAxisY(axisToPixelY(this.imaginary) + y);
    }
}
