//type 0 is adder
//type 1 is multiplier

function MakeOperator(type) {
    
    if(type==0){
	
	this.myInput1 = new MakeNumber(0,0,true);
	this.myInput2 = new MakeNumber(0,0,true);
	
	this.myOutput = new MakeNumber(0,0,false);
	
    }else if(type==1){
	
	this.myInput1 = new MakeNumber(1,0,true);
	this.myInput2 = new MakeNumber(1,0,true);
	
	this.myOutput = new MakeNumber(1,0,false);
    }
    
    //mode booleans for backdriving input 1 and input 2
    this.reverseMode1 = false;
    this.reverseMode2 = false;
    
    //boolean that reports if one of its inputs is being dragged
    this.dragging = false;
    
    //boolean marking that this operator is in the process of being reversed
    this.beingReversed = false;
    
    
    //booleans for collapsed operator and its forward/backward kinematics
    this.collapsed = false;
    this.reverseCollapsed = false;
    
    
    //checks each of its inputs to see if the mouse is currently hovering over
    this.overMe = function(){
	return (this.myInput1.overMe() ||
		this.myInput2.overMe() ||
		this.myOutput.overMe());
    }

    this.owns = function(node){
	return (this.myInput1 === node ||
		this.myInput2 === node ||
		this.myOutput === node);
    }
    
    //checks to see if mouse is over any free nodes
    this.clickMe = function(){
	if (this.reverseMode1) {
	    if (this.myInput2.clickMe()) {
		this.dragging = true;
		return true;
	    }else{
		return this.myOutput.clickMe();
	    }
	}else if (this.reverseMode2){
	    if (this.myInput1.clickMe()) {
		this.dragging = true;
		return true;
	    }else{
		return this.myOutput.clickMe();
	    }
	}else{
	    if (this.myInput1.clickMe()) {
		this.dragging = true;
		return true;
	    }else{
		return this.myInput2.clickMe();
	    }
	}	
    }

    // ???
    this.allFalse = function(){
	this.myInput1.dragging = false;
	this.myInput2.dragging = false;
	this.myOutput.dragging = false;
	
	this.dragging = false;
    }
    
    // double click on nodes to control dependencies
    this.reverseOperator = function(){
	
	// Mode changes for uncollapsed adder
	// Right now activates mode-switch chooser,
	// and reversals are handled by a function at the sketch level
	if(!this.collapsed){
	    
	    // want to give control to input 1, currently bound and not stacked
	    if (this.myInput1.over && !this.myInput1.free && !this.myInput1.inStack){
		//top level reversal boolean
		reversingOperator = true;
		//local reversal boolean
		this.beingReversed = true;
		
		freeNodeSearch(this.myInput2);
		freeNodeSearch(this.myOutput);
	    }

	    // want to give control to input 2, currently bound and not stacked
	    if (this.myInput2.over && !this.myInput2.free && !this.myInput2.inStack){
		//top level reversal boolean
		reversingOperator = true;
		//local reversal boolean
		this.beingReversed = true;
		
		freeNodeSearch(this.myInput1);
		freeNodeSearch(this.myOutput);
	    }
	    
	    // want to give control to output, currently bound and not stacked
	    if(this.myOutput.over && !this.myOutput.free && !this.myOutput.inStack){
		//top level reversal boolean
		reversingOperator = true;
		//local reversal boolean
		this.beingReversed = true;
		
		freeNodeSearch(this.myInput1);
		freeNodeSearch(this.myInput2);
	    }	    
	}else{
	    // mode changes for collapsed adder
	    // (which are automatic, so don't need the sketch level function)
	    
	    //double click on input1
	    if (this.myInput1.over && !this.myInput1.free){
		
		//make input1 dependent
		this.myInput1.free = true;
		
		//free up the output node...
		this.myOutput.free = false;
		
		//change to appropriate dependency mode
		this.reverseCollapsed = false;
	    }
	    
	    //double click on output
	    if (this.myOutput.over && !this.myOutput.free){
		
		//make output dependent
		this.myOutput.free = true;
		//free up input 1
		this.myInput1.free = false;
		
		//change to appropriate dependency mode
		this.reverseCollapsed = true;	
	    }
	}
    }
    
    this.update = function(){
	//check if this operator is being collapsed via press-and-hold
	if(this.myInput1.over && this.myInput2.over){
	    if(pressAndHold){
		if((millis()-timerStart)>holdLength){
		    indicatorFlash = true;
		    pressAndHold = false;
		    this.collapsed = true;
		    this.myInput1.free = true;
		    this.myOutput.free = false;
		    // what happens to input 2 here?
		}
	    }
	}
	
	//update possibly dragging numbers
	this.myInput1.update();
	this.myInput2.update();
	this.myOutput.update();
	
	for (i=0; i<iterations; i++){
	    if (type==0){
		this.propagateOutputSum();
	    } else if (type==1){
		this.propagateOutputProd();
	    }
	}	
    }
    
    this.propagateOutputSum = function(){
	var r1 = this.myInput1.getReal();
	var i1 = this.myInput1.getImaginary();
	var r2 = this.myInput2.getReal();
	var i2 = this.myInput2.getImaginary();
	var rout = this.myOutput.getReal();
	var iout = this.myOutput.getImaginary();
	
	//Four directions to check for better position.
	var upperY;
	var lowerY;
	var leftX;
	var rightX;

	if (!this.collapsed){ // for uncollapsed operator
	    if (!this.reverseMode1 && !this.reverseMode2){
		//check whether moving left or right better fits constraints...
		leftX = (rout - searchSize) - (r1 + r2);
		rightX = (rout + searchSize) - (r1 + r2);
		//...same for up or down movement...
		upperY = (iout + searchSize) - (i1 + i2);
		lowerY = (iout - searchSize) - (i1 + i2);
		//decide whether/where to shift ouput position.
		this.myOutput.shiftPx(compareShifts(leftX, rightX),
				      compareShifts(upperY, lowerY));
		
	    } else if (this.reverseMode1){
		leftX = (r1 - searchSize) - (rout - r2);
		rightX = (r1 + searchSize) - (rout - r2);
		upperY = (i1 + searchSize) - (iout - i2);
		lowerY = (i1 - searchSize) - (iout - i2);
		this.myInput1.shiftPx(compareShifts(leftX, rightX),
				      compareShifts(upperY, lowerY));
		
	    } else if(this.reverseMode2){
		leftX = (r2 - searchSize) - (rout - r1);
		rightX = (r2 + searchSize) - (rout - r1);
		upperY = (i2 + searchSize) - (iout - i1);
		lowerY = (i2 - searchSize) - (iout - i1);
		this.myInput2.shiftPx(compareShifts(leftX, rightX),
				      compareShifts(upperY, lowerY));
	    }
	}else{ // collapsed operator
	    if(!this.reverseCollapsed){
		leftX = (rout - searchSize) - (r1 * 2);
		rightX = (rout + searchSize) - (r1 * 2);
		upperY = (iout + searchSize) - (i1 * 2);
		lowerY = (iout - searchSize) - (i1 * 2);
		this.myOutput.shiftPx(compareShifts(leftX, rightX),
				      compareShifts(upperY, lowerY));
		
	    }else{
		leftX = (r1 - searchSize) - (rout / 2);
		rightX = (r1 + searchSize) - (rout / 2);
		upperY = (i1 + searchSize) - (iout / 2);
		lowerY = (i1 - searchSize) - (iout / 2);
		this.myInput1.shiftPx(compareShifts(leftX, rightX),
				      compareShifts(upperY, lowerY));
	    }
	}
    }
    
    this.propagateOutputProd = function(){
	var r1 = this.myInput1.getReal();
	var i1 = this.myInput1.getImaginary();
	var r2 = this.myInput2.getReal();
	var i2 = this.myInput2.getImaginary();
	var rout = this.myOutput.getReal();
	var iout = this.myOutput.getImaginary();
	var rprod = (r1 * r2) - (i1 * i2);
	var iprod = (r1 * i2) + (i1 * r2);

	//Four directions to check for better position.
	var upperY;
	var lowerY;
	var leftX;
	var rightX;
	
	if(!this.collapsed){ //for uncollapsed operator
	    console.log("!");
	    if(!this.reverseMode1&&!this.reverseMode2){
		//check whether moving left or right better fits constraints...
		leftX = (rout - searchSize) - rprod;
		rightX = (rout + searchSize) - rprod;
		//...same for up or down movement...
		upperY = (iout + searchSize) - iprod;
		lowerY = (iout - searchSize) - iprod;
		//decide whether/where to shift ouput position.
		this.myOutput.shiftPx(compareShifts(leftX, rightX),
				      compareShifts(upperY, lowerY));
		
	    }else if(this.reverseMode1){
		let denominator = (r2 * r2) + (i2 * i2);
		let rquot = ((rout * r2) + (iout * i2)) / denominator;
		let iquot = ((iout * r2) - (rout * i2)) / denominator;
		
		leftX = (r1 - searchSize) - rqout;
		rightX = (r1 + searchSize) - rquot;
		upperY = (i1 + searchSize) - iquot;
		lowerY = (i1 - searchSize) - iquot;
		this.myInput1.shiftPx(compareShifts(leftX, rightX),
				      compareShifts(upperY, lowerY));
		
	    }else if(this.reverseMode2){
		let denominator = (r1 * r1) + (i1 * i1);
		let rquot = ((rout * r1) + (iout * i1)) / denominator;
		let iquot = ((iout * r1) - (rout * i1)) / denominator;
		
		leftX = (r2 - searchSize) - rquot;
		rightX = (r2 + searchSize) - rquot;
		upperY = (i2 + searchSize) - iquot;
		lowerY = (i2 - searchSize) - iquot;
		
		this.myInput2.shiftPx(compareShifts(leftX, rightX),
				      compareShifts(upperY, lowerY));
	    }
	}else{ //for collapsed operator
	    if(!this.reverseCollapsed){
		// note: previously this section recalculated everything in terms
		// of only Input1, but since both inputs should have the same
		// coordinates, I'm just using the product we already calculated -J
		leftX = (rout - searchSize) - rprod;
		rightX = (rout + searchSize) - rprod;
		upperY = (iout + searchSize) - iprod;
		lowerY = (iout - searchSize) - iprod;
		this.myOutput.shiftPx(compareShifts(leftX, rightX),
				      compareShifts(upperY, lowerY));
	    }else{
		// NOTE: unlike the above searches, where we just ignore input2,
		// in this case we start each iteration by
		// moving the "invisible" input2 to towards input1,
		// and then use that position to update input1 
		this.myInput2.shift((r1 - r2)*.4, (i1 - i2)*.4);
		r2 = this.myInput2.getReal();
		i2 = this.myInput2.getImaginary();
		
		let denominator = (r2 * r2) + (i2 * i2);
		let rquot = ((rout * r2) + (iout * i2)) / denominator;
		let iquot = ((iout * r2) - (rout * i2)) / denominator;
		
		leftX = (r1 - searchSize) - rquot;
		rightX = (r1 + searchSize) - rquot;
		upperY = (i1 + searchSize) - iquot;
		lowerY = (i1 - searchSize) - iquot;
		
		this.myInput1.shiftPx(compareShifts(leftX, rightX),
				      compareShifts(upperY, lowerY));
	    }
	}
    }

    // display all the pieces of this relation
    this.display = function(){
	if(!this.collapsed){ // display for uncollapsed operator...
	    
	    if(type==0){      
		// parallelogram      
		noFill();
		stroke(30,200,225);
		strokeWeight(1);
		beginShape();
		vertex(width/2,height/2);
		vertex(this.myInput1.getRealPx(), this.myInput1.getImaginaryPx());
		vertex(this.myOutput.getRealPx(), this.myOutput.getImaginaryPx());
		vertex(this.myInput2.getRealPx(), this.myInput2.getImaginaryPx());
		endShape(CLOSE);
		// nodes
		fill(200,255,255);
		this.myInput1.display();
		fill(200,255,255);
		this.myInput2.display();
		fill(30,200,255);
		this.myOutput.display();
		
	    }else if(type==1){
		// lines
		noFill();
		strokeWeight(1);
		stroke(255,0,0);
		line(width/2, height/2,
		     this.myOutput.getRealPx(), this.myOutput.getImaginaryPx());
		stroke(255,100,0);
		line(width/2, height/2,
		     this.myInput1.getRealPx(), this.myInput1.getImaginaryPx());
		line(width/2, height/2,
		     this.myInput2.getRealPx(), this.myInput2.getImaginaryPx());
		//nodes
		noStroke();     
		fill(255,0,0);
		this.myOutput.display();
		fill(255,100,0);
		this.myInput1.display();
		fill(255,100,0);
		this.myInput2.display();
	    }
	    
	}else{ // display for collapsed operator...
	    if(type==0){
		noFill();
		stroke(30,200,225);
		strokeWeight(1);
		// only one line in a doubler/halver
		line(width/2, height/2,
		     this.myOutput.getRealPx(), this.myOutput.getImaginaryPx());
		//nodes
		fill(200,255,200);
		this.myInput1.display();
		fill(30,200,255);
		this.myOutput.display();
		
	    }else if(type==1){
		// lines for square and root
		noFill();
		stroke(255,0,0);
		strokeWeight(1);
		line(width/2, height/2,
		     this.myOutput.getRealPx(), this.myOutput.getImaginaryPx());
		stroke(255,100,0);
		line(width/2, height/2,
		     this.myInput1.getRealPx(), this.myInput1.getImaginaryPx());
		//nodes
		noStroke();
		fill(255,200,0);
		this.myInput1.display();
		fill(255,0,0);
		this.myOutput.display();
	    }
	}
    }
    
    //maybe defining this at the level of the number?
    this.freeNodeDisplay = function(){
	noStroke();
	
	if(this.myInput1.free){
	    if(type==0){
		fill(200,255,255);
	    }else{
		fill(255,100,0);
	    }
	    ellipse(this.myInput1.getRealPx(), this.myInput1.getImaginaryPx(),
		    15, 15);
	}
	if(this.myInput2.free){
	    if(type==0){
		fill(200,255,255);
	    }else{
		fill(255,100,0);
	    }
	    ellipse(this.myInput2.getRealPx(), this.myInput2.getImaginaryPx(),
		    15, 15);
	}
	if(this.myOutput.free){
	    if(type==0){
		fill(30,200,255);
	    }else{
		fill(255,0,0);
	    }
	    ellipse(this.myOutput.getRealPx(), this.myOutput.getImaginaryPx(),
		    15, 15);
	}
    }
}

//compares nearby points to see if its profitable to move in a given direction,
// and determines the appropriate shift...
function compareShifts(neg,pos) {
    if (abs(neg) < abs(pos)){
	return -1;
    } else if (abs(neg) > abs(pos)){
	return 1;
    } else {
	return 0;
    }
}

