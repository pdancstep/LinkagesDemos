// operator type
const ADDER = 0;
const MULTIPLIER = 1;

// operator mode
const DEFAULT = 0;
const REVERSE1 = 1;
const REVERSE2 = 2;
const COLLAPSED = 3;
const REVCOLLAPSED = 4;

function MakeOperator(type) {
    
    if(type==ADDER){
	this.myInput1 = new MakeNumber(0,0,true);
	this.myInput2 = new MakeNumber(0,0,true);
	this.myOutput = new MakeNumber(0,0,false);
    }else if(type==MULTIPLIER){
	this.myInput1 = new MakeNumber(1,0,true);
	this.myInput2 = new MakeNumber(1,0,true);
	this.myOutput = new MakeNumber(1,0,false);
    }
    
    // setting for which operands are driving which other operand
    this.mode = DEFAULT;
    
    //boolean that reports if one of this operator's nodes is being dragged
    this.dragging = false;
    
    //boolean marking that this operator is in the process of being reversed
    this.beingReversed = false;
    
    //checks each of its inputs to see if the mouse is currently hovering over
    this.overMe = function(){
	return (this.myInput1.overMe() ||
		this.myInput2.overMe() ||
		this.myOutput.overMe());
    }

    // does this node belong to this operator?
    this.owns = function(node){
	return (this.myInput1 === node ||
		this.myInput2 === node ||
		this.myOutput === node);
    }
    
    //checks to see if mouse is over any free nodes
    this.clickMe = function(){
	switch (this.mode){
	case DEFAULT:
	    if (this.myInput1.clickMe() || this.myInput2.clickMe()) {
		this.dragging = true;
		return true;
	    }else{
		return false;
	    }
	case REVERSE1:
	    if (this.myInput2.clickMe() || this.myOutput.clickMe()) {
		this.dragging = true;
		return true;
	    }else{
		return false;
	    }
	case REVERSE2:
	    if (this.myInput1.clickMe() || this.myOutput.clickMe()) {
		this.dragging = true;
		return true;
	    }else{
		return false;
	    }
	case COLLAPSED:
	    if (this.myInput1.clickMe()) {
		this.dragging = true;
		return true;
	    }else{
		return false;
	    }
	case REVCOLLAPSED:
	    if (this.myOutput.clickMe()) {
		this.dragging = true;
		return true;
	    }else{
		return false;
	    }
	default:
	    // should not get here
	    return false;
	}
    }

    // release mouse
    this.allFalse = function(){
	this.myInput1.dragging = false;
	this.myInput2.dragging = false;
	this.myOutput.dragging = false;
	
	this.dragging = false;
    }
    
    // double click on nodes to control dependencies
    this.reverseOperator = function(){
	switch (this.mode){
	// uncollapsed cases just activate global reversal mode.
	// we'll actually reverse when user selects node to give up control of
	case DEFAULT: {
	    // want to give control to output, currently bound and not stacked
	    if(this.myOutput.over && !this.myOutput.inStack){
		//top level reversal boolean
		reversingOperator = true;
		//local reversal boolean
		this.beingReversed = true;
		
		freeNodeSearch(this.myInput1);
		freeNodeSearch(this.myInput2);
	    }
	} break;
	case REVERSE1: {
	    // want to give control to input 1, currently bound and not stacked
	    if (this.myInput1.over && !this.myInput1.inStack){
		//top level reversal boolean
		reversingOperator = true;
		//local reversal boolean
		this.beingReversed = true;
		
		freeNodeSearch(this.myInput2);
		freeNodeSearch(this.myOutput);
	    }
	} break;
	case REVERSE2: {
	    // want to give control to input 2, currently bound and not stacked
	    if (this.myInput2.over && !this.myInput2.inStack){
		//top level reversal boolean
		reversingOperator = true;
		//local reversal boolean
		this.beingReversed = true;
		
		freeNodeSearch(this.myInput1);
		freeNodeSearch(this.myOutput);
	    }
	} break;
	// collapsed cases can be handled in full right here
	case COLLAPSED: {
	    if (this.myOutput.over){
		this.myOutput.free = true;
		this.myInput1.free = false;
		this.mode = REVCOLLAPSED;
	    }	    
	} break;
	case REVCOLLAPSED: {
	    if (this.myInput1.over){
		this.myInput1.free = true;
		this.myOutput.free = false;
		this.mode = COLLAPSED;
	    }
	} break;
	default:
	    // should not get here
	}
    }

    this.finishReversal = function() {
	if (this.beingReversed) {
	    // giving up control of input 1
	    if (this.myInput1.over && this.myInput1.free){
		this.myInput1.free = false;
		this.myInput2.free = true;
          	this.myOutput.free = true;
        	oper.mode = REVERSE1;
	    // giving up control of input 2
	    }else if (this.myInput2.over && this.myInput2.free){
          	this.myInput1.free = true;
		this.myInput2.free = false;
          	this.myOutput.free = true;	
        	oper.mode = REVERSE2;
	    // giving up control of output
	    }else if (this.myOutput.over && this.myOutput.free){
          	this.myInput1.free = true;
          	this.myInput2.free = true;
		this.myOutput.free = false;
        	this.mode = DEFAULT;
	    }
	    this.beingReversed = false;
	}
    }
    
    this.update = function(){
	//check if this operator is being collapsed via press-and-hold
	if (this.myInput1.over && this.myInput2.over){
	    if(pressAndHold){
		if((millis()-timerStart)>holdLength){
		    indicatorFlash = true;
		    pressAndHold = false;
		    this.mode = COLLAPSED;
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
	let r1 = this.myInput1.getReal();
	let i1 = this.myInput1.getImaginary();
	let r2 = this.myInput2.getReal();
	let i2 = this.myInput2.getImaginary();
	let rout = this.myOutput.getReal();
	let iout = this.myOutput.getImaginary();

	switch (this.mode){
	case DEFAULT: {
	    //check whether moving left or right better fits constraints...
	    let leftX = (rout - searchSize) - (r1 + r2);
	    let rightX = (rout + searchSize) - (r1 + r2);
	    //...same for up or down movement...
	    let upperY = (iout + searchSize) - (i1 + i2);
	    let lowerY = (iout - searchSize) - (i1 + i2);
	    //decide whether/where to shift ouput position.
	    this.myOutput.shiftPx(compareShifts(leftX, rightX),
				  compareShifts(upperY, lowerY));
	} break;
	case REVERSE1: {
	    let leftX = (r1 - searchSize) - (rout - r2);
	    let rightX = (r1 + searchSize) - (rout - r2);
	    let upperY = (i1 + searchSize) - (iout - i2);
	    let lowerY = (i1 - searchSize) - (iout - i2);
	    this.myInput1.shiftPx(compareShifts(leftX, rightX),
				  compareShifts(upperY, lowerY));
	} break;
	case REVERSE2: {
	    let leftX = (r2 - searchSize) - (rout - r1);
	    let rightX = (r2 + searchSize) - (rout - r1);
	    let upperY = (i2 + searchSize) - (iout - i1);
	    let lowerY = (i2 - searchSize) - (iout - i1);
	    this.myInput2.shiftPx(compareShifts(leftX, rightX),
				  compareShifts(upperY, lowerY));
	} break;
	case COLLAPSED: {
	    let leftX = (rout - searchSize) - (r1 * 2);
	    let rightX = (rout + searchSize) - (r1 * 2);
	    let upperY = (iout + searchSize) - (i1 * 2);
	    let lowerY = (iout - searchSize) - (i1 * 2);
	    this.myOutput.shiftPx(compareShifts(leftX, rightX),
				  compareShifts(upperY, lowerY));
	} break;
	case REVCOLLAPSED: {
	    let leftX = (r1 - searchSize) - (rout / 2);
	    let rightX = (r1 + searchSize) - (rout / 2);
	    let upperY = (i1 + searchSize) - (iout / 2);
	    let lowerY = (i1 - searchSize) - (iout / 2);
	    this.myInput1.shiftPx(compareShifts(leftX, rightX),
				  compareShifts(upperY, lowerY));
	} break;
	default:
	    // should not get here
	}
    }
    
    this.propagateOutputProd = function(){
	let r1 = this.myInput1.getReal();
	let i1 = this.myInput1.getImaginary();
	let r2 = this.myInput2.getReal();
	let i2 = this.myInput2.getImaginary();
	let rout = this.myOutput.getReal();
	let iout = this.myOutput.getImaginary();
	let rprod = (r1 * r2) - (i1 * i2);
	let iprod = (r1 * i2) + (i1 * r2);

	switch (this.mode){
	case DEFAULT:
	case COLLAPSED: {
	    //check whether moving left or right better fits constraints...
	    let leftX = (rout - searchSize) - rprod;
	    let rightX = (rout + searchSize) - rprod;
	    //...same for up or down movement...
	    let upperY = (iout + searchSize) - iprod;
	    let lowerY = (iout - searchSize) - iprod;
	    //decide whether/where to shift ouput position.
	    this.myOutput.shiftPx(compareShifts(leftX, rightX),
				  compareShifts(upperY, lowerY));
	} break;
	case REVERSE1: {
	    let denominator = (r2 * r2) + (i2 * i2);
	    let rquot = ((rout * r2) + (iout * i2)) / denominator;
	    let iquot = ((iout * r2) - (rout * i2)) / denominator;
	    
	    let leftX = (r1 - searchSize) - rqout;
	    let rightX = (r1 + searchSize) - rquot;
	    let upperY = (i1 + searchSize) - iquot;
	    let lowerY = (i1 - searchSize) - iquot;
	    this.myInput1.shiftPx(compareShifts(leftX, rightX),
				  compareShifts(upperY, lowerY));
	} break;
	case REVERSE2: {
	    let denominator = (r1 * r1) + (i1 * i1);
	    let rquot = ((rout * r1) + (iout * i1)) / denominator;
	    let iquot = ((iout * r1) - (rout * i1)) / denominator;
	    
	    let leftX = (r2 - searchSize) - rquot;
	    let rightX = (r2 + searchSize) - rquot;
	    let upperY = (i2 + searchSize) - iquot;
	    let lowerY = (i2 - searchSize) - iquot;
	    this.myInput2.shiftPx(compareShifts(leftX, rightX),
				      compareShifts(upperY, lowerY));
	} break;
	case REVCOLLAPSED: {
	    // in this case we start each iteration by
	    // moving the "invisible" input2 to towards input1,
	    // and then use that position to update input1 
	    this.myInput2.shift((r1 - r2)*.4, (i1 - i2)*.4);
	    r2 = this.myInput2.getReal();
	    i2 = this.myInput2.getImaginary();
	    
	    let denominator = (r2 * r2) + (i2 * i2);
	    let rquot = ((rout * r2) + (iout * i2)) / denominator;
	    let iquot = ((iout * r2) - (rout * i2)) / denominator;
		
	    let leftX = (r1 - searchSize) - rquot;
	    let rightX = (r1 + searchSize) - rquot;
	    let upperY = (i1 + searchSize) - iquot;
	    let lowerY = (i1 - searchSize) - iquot;
	    this.myInput1.shiftPx(compareShifts(leftX, rightX),
				  compareShifts(upperY, lowerY));
	} break;
	default:
	    // should not get here
	}
    }

    // display all the pieces of this relation
    this.display = function(){
	if (this.mode==DEFAULT || this.mode==REVERSE1 || this.mode==REVERSE2){
	    // display for uncollapsed operator...
	    
	    if(type==ADDER){      
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
		
	    }else if(type==MULTIPLIER){
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
	    if(type==ADDER){
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
		
	    }else if(type==MULTIPLIER){
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
