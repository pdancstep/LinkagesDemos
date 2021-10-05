// operator type
const ADDER = 0;
const MULTIPLIER = 1;

// operator mode
const DEFAULT = 0;
const REVERSE1 = 1;
const REVERSE2 = 2;
const COLLAPSED = 3;
const REVCOLLAPSED = 4;

// path labels
const OUTPUT = 0;
const INPUT1 = 1;
const INPUT2 = 2;

class Operator {
    constructor(type) {
	this.type = type;

	if (this.type == ADDER) {
	    this.myInput1 = new Number(0, 0, this, true);
	    this.myInput2 = new Number(0, 0, this, true);
	    this.myOutput = new Number(0, 0, this, false);
	} else if (this.type == MULTIPLIER) {
	    this.myInput1 = new Number(1, 0, this, true);
	    this.myInput2 = new Number(1, 0, this, true);
	    this.myOutput = new Number(1, 0, this, false);
	}

	// setting for which operands are driving which other operand
	this.mode = DEFAULT;
	
	//boolean that reports if one of this operator's nodes is being dragged
	this.dragging = false;
	
	//boolean marking that this operator is in the process of being reversed
	this.beingReversed = false;

	this.myindex = registerOperator(this);
    }

    //checks each of its inputs to see if the mouse is currently hovering over
    checkMouseover() {
	return (this.myInput1.checkMouseover() ||
		this.myInput2.checkMouseover() ||
		this.myOutput.checkMouseover());
    }

    // does this node belong to this operator?
    // not sure we still need this
    owns(node) {
	return (this.myInput1 === node ||
		this.myInput2 === node ||
		this.myOutput === node);
    }
    
    //checks to see if mouse is over any free nodes
    notifyClick() {
	switch (this.mode) {
	case DEFAULT:
	    this.dragging
		=  this.myInput1.notifyClick()
		|| this.myInput2.notifyClick();
	    return this.dragging;
	case REVERSE1:
	    this.dragging
		=  this.myInput2.notifyClick()
		|| this.myOutput.notifyClick();
	    return this.dragging;
	case REVERSE2:
	    this.dragging
		=  this.myInput1.notifyClick()
		|| this.myOutput.notifyClick();
	    return this.dragging;
	case COLLAPSED:
	    this.dragging = this.myInput1.notifyClick();
	    return this.dragging;
	case REVCOLLAPSED:
	    this.dragging = this.myOutput.notifyClick();
	    return this.dragging;
	default:
	    // should not get here
	    return false;
	}
    }

    // release mouse
    notifyRelease() {
	this.myInput1.notifyRelease();
	this.myInput2.notifyRelease();
	this.myOutput.notifyRelease();
	
	this.dragging = false;
    }

    getBoundNode() {
	switch (this.mode) {
	case DEFAULT:
	    return this.myOutput;
	case REVERSE1:
	    return this.myInput1;
	case REVERSE2:
	    return this.myInput2;
	case COLLAPSED:
	    return this.myOutput;
	case REVCOLLAPSED:
	    return this.myInput1;
	default:
	    // should not get here
	}
    }

    // send information about free nodes originating from this operator
    // to the global freeNodes & freeNodePaths arrays
    // visited: array of booleans corresponding to myOperators
    // path: directions to get here
    registerFreeNodes(visited, path) {
	// don't search this operator again if we've already been here
	if (visited[this.myindex]) { return; }
	visited[this.myindex] = true;

	// if we are in a mode where myInput1 is free w.r.t. this operator...
	if (this.mode==DEFAULT || this.mode==REVERSE2 || this.mode==COLLAPSED) {
	    // ...build a path appending this operator, and then...
	    let newpath = path.slice();
	    newpath.push(this);
	    if (this.myInput1.free) {
		// ...if myInput1 is indeed free, register this path.
		newpath.push(INPUT1);
		freeNodes.push(this.myInput1);
		freeNodePaths.push(newpath);
	    }else{
		// ...if myInput1 is bound elsewhere, search that operator.
		this.myInput1.controller.registerFreeNodes(visited, newpath);
	    }
	}

	// modes where myInput2 is free w.r.t this operator
	if (this.mode==DEFAULT || this.mode==REVERSE1) {
	    let newpath = path.slice();
	    newpath.push(this);
	    if (this.myInput2.free) {
		newpath.push(INPUT2);
		freeNodes.push(this.myInput2);
		freeNodePaths.push(newpath);
	    }else{
		this.myInput2.controller.registerFreeNodes(visited, newpath);
	    }
	}

	// modes where myOutput is free w.r.t. this operator
	if (this.mode==REVERSE1 || this.mode==REVERSE2 || this.REVCOLLAPSED) {
	    let newpath = path.slice();
	    newpath.push(this);
	    if (this.myOutput.free) {
		newpath.push(OUTPUT);
		freeNodes.push(this.myOutput);
		freeNodePaths.push(newpath);
	    }else{
		this.myOutput.controller.registerFreeNodes(visited, newpath);
	    }
	}
    }
    
    // double click on nodes to control dependencies
    // returns true if a reversal was initiated, false if none was possible
    // if true, the global mode variable reversingOperator indicates whether
    // the reversal that was initiated is still in progress awaiting user input
    reverseOperator() {
	// error check
	if (freeNodes.length > 0 || freeNodePaths.length > 0) {
	    // global arrays are already in use; something is wrong
	    return false;
	}
	
	switch (this.mode) {
	case DEFAULT:
	    // want to give control to output
	    if (this.myOutput.mouseover) {
		// search for free nodes
		let visits = myOperators.map(_ => false);
		let path = [];
		this.registerFreeNodes(visits, path);
		if (freeNodes.length > 1) {
		    // multiple options for a free node to give up:
		    // enter global reversal mode to let the user choose
		    reversingOperator = true;
		    this.beingReversed = true;
		    return true;
		}else if (freeNodes.length == 1) {
		    this.beingReversed = true;
		    this.finishReversal();
		    return true;
		}else{
		    // didn't find any way to reverse; nothing left to do
		    return false;
		}
	    }
	    return false;
	case TODO:
	}
    }

    // close out in-progress reversal after user selects node to give up control of
    finishReversal() {
	// TODO
	let path = freeNodePaths[whatever];
	let argument = path.pop();
	let operator = path.pop();
	if (operator.beingReversed) {
	}
	else {
	    
	    finishReversal()
	}
    }
    
    update() {
	//check if this operator is being collapsed via press-and-hold
	if (this.myInput1.mouseover && this.myInput2.mouseover) {
	    if (pressAndHold) {
		if ((millis()-timerStart)>holdLength) {
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
	    if (this.type==ADDER){
		this.propagateOutputSum();
	    } else if (this.type==MULTIPLIER){
		this.propagateOutputProd();
	    }
	}	
    }
    
    propagateOutputSum() {
	let r1 = this.myInput1.getReal();
	let i1 = this.myInput1.getImaginary();
	let r2 = this.myInput2.getReal();
	let i2 = this.myInput2.getImaginary();
	let rout = this.myOutput.getReal();
	let iout = this.myOutput.getImaginary();

	let leftX, rightX, upperY, lowerY, movingNode;
	switch (this.mode) {
	case DEFAULT:
	    leftX = (rout - searchSize) - (r1 + r2);
	    rightX = (rout + searchSize) - (r1 + r2);

	    upperY = (iout + searchSize) - (i1 + i2);
	    lowerY = (iout - searchSize) - (i1 + i2);

	    movingNode = this.myOutput;
	    break;
	    
	case REVERSE1: 
	    leftX = (r1 - searchSize) - (rout - r2);
	    rightX = (r1 + searchSize) - (rout - r2);
	    upperY = (i1 + searchSize) - (iout - i2);
	    lowerY = (i1 - searchSize) - (iout - i2);
	    movingNode = this.myInput1;
	    break;
	    
	case REVERSE2: 
	    leftX = (r2 - searchSize) - (rout - r1);
	    rightX = (r2 + searchSize) - (rout - r1);
	    upperY = (i2 + searchSize) - (iout - i1);
	    lowerY = (i2 - searchSize) - (iout - i1);
	    movingNode = this.myInput2;
	    break;
	    
	case COLLAPSED: 
	    leftX = (rout - searchSize) - (r1 * 2);
	    rightX = (rout + searchSize) - (r1 * 2);
	    upperY = (iout + searchSize) - (i1 * 2);
	    lowerY = (iout - searchSize) - (i1 * 2);
	    movingNode = this.myOutput;
	    break;
	    
	case REVCOLLAPSED: 
	    leftX = (r1 - searchSize) - (rout / 2);
	    rightX = (r1 + searchSize) - (rout / 2);
	    upperY = (i1 + searchSize) - (iout / 2);
	    lowerY = (i1 - searchSize) - (iout / 2);
	    movingNode = this.myInput1;
	    break;

	default:
	    // should not get here
	}
	movingNode.shiftPx(compareShifts(leftX, rightX),
			   compareShifts(upperY, lowerY));
    }

    propagateOutputProd() {
	let r1 = this.myInput1.getReal();
	let i1 = this.myInput1.getImaginary();
	let r2 = this.myInput2.getReal();
	let i2 = this.myInput2.getImaginary();
	let rout = this.myOutput.getReal();
	let iout = this.myOutput.getImaginary();
	let rprod = (r1 * r2) - (i1 * i2);
	let iprod = (r1 * i2) + (i1 * r2);

	let leftX, rightX, upperY, lowerY, movingNode, denominator, rquot, iquot;
	
	switch (this.mode) {
	case DEFAULT:
	case COLLAPSED:
	    //check whether moving left or right better fits constraints...
	    leftX = (rout - searchSize) - rprod;
	    rightX = (rout + searchSize) - rprod;
	    //...same for up or down movement...
	    upperY = (iout + searchSize) - iprod;
	    lowerY = (iout - searchSize) - iprod;
	    //decide whether/where to shift ouput position.
	    movingNode = this.myOutput;
	    break;
	    
	case REVERSE1: 
	    denominator = (r2 * r2) + (i2 * i2);
	    rquot = ((rout * r2) + (iout * i2)) / denominator;
	    iquot = ((iout * r2) - (rout * i2)) / denominator;
	    
	    leftX = (r1 - searchSize) - rquot;
	    rightX = (r1 + searchSize) - rquot;
	    upperY = (i1 + searchSize) - iquot;
	    lowerY = (i1 - searchSize) - iquot;
	    movingNode = this.myInput1;
	    break;
	    
	case REVERSE2: 
	    denominator = (r1 * r1) + (i1 * i1);
	    rquot = ((rout * r1) + (iout * i1)) / denominator;
	    iquot = ((iout * r1) - (rout * i1)) / denominator;
	    
	    leftX = (r2 - searchSize) - rquot;
	    rightX = (r2 + searchSize) - rquot;
	    upperY = (i2 + searchSize) - iquot;
	    lowerY = (i2 - searchSize) - iquot;
	    movingNode = this.myInput2;
	    break;
	    
	case REVCOLLAPSED: 
	    // in this case we start each iteration by
	    // moving the "invisible" input2 to towards input1,
	    // and then use that position to update input1 
	    this.myInput2.shift((r1 - r2)*.4, (i1 - i2)*.4);
	    r2 = this.myInput2.getReal();
	    i2 = this.myInput2.getImaginary();
	    
	    denominator = (r2 * r2) + (i2 * i2);
	    rquot = ((rout * r2) + (iout * i2)) / denominator;
	    iquot = ((iout * r2) - (rout * i2)) / denominator;
		
	    leftX = (r1 - searchSize) - rquot;
	    rightX = (r1 + searchSize) - rquot;
	    upperY = (i1 + searchSize) - iquot;
	    lowerY = (i1 - searchSize) - iquot;
	    movingNode = this.myInput1;
	 break;
	    
	default:
	    // should not get here
	}
	movingNode.shiftPx(compareShifts(leftX, rightX),
			   compareShifts(upperY, lowerY));
    }

    // display all the pieces of this relation
    display() {
	if (this.mode==DEFAULT || this.mode==REVERSE1 || this.mode==REVERSE2) {
	    // display for uncollapsed operator...
	    
	    if (this.type==ADDER) {      
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
		
	    }else if (this.type==MULTIPLIER) {
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
	    if (this.type==ADDER) {
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
		
	    }else if (this.type==MULTIPLIER) {
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
