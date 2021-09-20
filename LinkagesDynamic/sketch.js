var myOperators = []; // global array of relations (each w 1-2 free and 1 bound Number)
var myBindings = []; // global array of stacks
                     // Numbers in each stack are bound to share the same coordinates

function setup() {
    createCanvas(1400,800);
    textAlign(CENTER,CENTER);
}

// ???
var indicator = 50;

//holds free nodes that a given node is dependent on (used to display during reversal)
var freeNodes = [];
//holds intermediate bound nodes that will need to be made free when reversal happens...
var intermediateReversals = [];

//how far to look in each direction
var searchSize = .1;

//how many iterations to run before updating
var iterations = 100;


//double tap reference (sketch level)
var tappedOnce = false;
var currentTime;
var doubleTapTimer = 300;

//press and hold references
var pressAndHold = false;
var timerStart ;
var holdLength = 700;

//boolean for going into state of switching a dependency...
var reversingOperator = false;

//extra number of loops for updating positions, helps with rigidity...
var updateCycles = 3;


function draw() {

    //manage double tap
    if(tappedOnce){
	if((millis()-currentTime)>doubleTapTimer){
	    tappedOnce=false;
	}
    }
    
    //look for bind opportunities
    if(pressAndHold){
  	if((millis()-timerStart)>holdLength){
  	    findNewBind();
  	}
    }
    
    //update nodes and bindings multiple times, so they have a chance to react to each other...
    for (m=0; m<updateCycles; m++){
	
	//update components on board
	for (const oper of myOperators) {
	    oper.overMe();
	    oper.update();
	}
	
	for (const stck of myBindings) {
	    stck.overMe();
	    stck.update();
	}
    }
    
    //draw board
    background(indicator);
    
    //background
    noFill();
    stroke(200);
    strokeWeight(1);
    line(0,height/2,width,height/2);
    line(width/2,0,width/2,height);
    ellipse(width/2,height/2,100,100); // unit circle
    
    //buttons
    noStroke();
    fill(30,200,255);
    ellipse(30,30,20,20);
    fill(255,100,0);
    ellipse(30,60,20,20);
    
    //draw operators
    for (const oper of myOperators) {
	oper.display();
    }
    
    //draw bound nodes
    for (const stck of myBindings) {
	stck.display();
    }
    
    
    //coordinate data
    fill(150);
    noStroke();
    for (i=-15; i<16; i++){
	text(i, width/2+i*50, height/2-16);
	text(-i+"i", width/2-20, height/2+i*50);
	ellipse(width/2+i*50, height/2, 5, 5);
	ellipse(width/2, height/2+i*50, 5, 5);
    }
    
    if(indicatorFlash){
	background(0);
	indicatorFlash = false;
    }
    
    //display mode while alternative dependency...
    if (reversingOperator){
	background(0,150);
	for (const node of freeNodes) {
	    node.freeNodeDisplay();
	}
    }
    
    // debug info - delete later
    fill(255);
    noStroke();
    for(k=0;k<freeNodes.length;k++){
	text(freeNodes[k].getRealPx(),100,100+30*k);
    }   
}

var indicatorFlash = false;

//function that searches for two uncoupled nodes to bind and initiate a new stack...
function findNewBind(){

    //variables defining first two nodes available for binding...
    let bindingNode1;
    let bindingNode2;

    //initialize that we're looking for first bind
    let lookingForFirstBind = true;
    //..and that our search is not yet complete
    let completedBind = false;
    //..and that we start out assuming there's an unstacked node...
    let bindToBind = false;
    
    function attemptBind(node){
	if (!completedBind && node.over && !node.inStack){
	    if (lookingForFirstBind){
		bindingNode1 = node;
		lookingForFirstBind = false;
	    }else{
		if (bindingNode1.free || node.free){
		    bindingNode2 = node;
		    indicatorFlash = true;
		    myBindings.push(new MakeBinding(bindingNode1,bindingNode2));
		    completedBind = true;
		}
	    }
	}
    }

    //first look through all non-bound nodes...
    for (const oper of myOperators){
	attemptBind(oper.myInput1);
	attemptBind(oper.myInput2);
	attemptBind(oper.myOutput);
    }
    
    //at this stage we may have:
    //1) completed a bind (completedBind = true) => do nothing
    //2) have one bindable node (lookingForFirstBind = false)
    //      => will add this node to .myStack of an existing binding
    //3) have no possible bindings yet (lookingForFirstBind = true)
    //      => will add the elements of one .myStack to the other binding's .myStack
    
    if (completedBind){
	return;
    }
    
    for (var s=0; s < myBindings.length; s++){
	let stck = myBindings[s];
	
	if (stck.over){
	    if (lookingForFirstBind){
		bindingNode1 = stck;
		lookingForFirstBind = false;
		bindToBind = true;
		continue;
		
	    }else{
		if (bindingNode1.free || stck.free){
		    bindingNode2 = stck;
		    indicatorFlash = true;

		    // adding a node to an existing stack...
		    if(!bindToBind){
			bindingNode1.inStack = true;
			stck.myStack.push(bindingNode1);
			//update free status of stack
			stck.amIFree();
			
		    }else{ // merging two stacks...
			for(const node of stck.myStack){
			    bindingNode1.myStack.push(node);
			}
			//update free status of stack
			bindingNode1.amIFree();
			//erase old stack
			myBindings.splice(s,1);
		    }
		    
		    completedBind = true;
		    break;
		}
	    }
	}
    }
}	

//chases down all free nodes on which the given node is dependent
// (starting with the other two nodes in the given operator)
function freeNodeSearch(node){
    // function is always called on a free node;
    // if that node isn't in a stack, add it to our freeNodes array
    if (!node.inStack){
	freeNodes.push(node);
    }else{
	//1. Determine which stack the node is in
	let dependentStack;
	for (const stck of myBindings){
    	    if (stck.owns(node)){
    		dependentStack = stck;
		break;
    	    }
	}
	if (dependentStack===undefined){
	    // TODO better error message?
	    console.log("Misplaced a node among the stacks!");
	}

	let dependentNode = dependentStack.getPrimary();
	//2. Figure out if that stack is free
	if(dependentStack.free){
	    //3. If so add top of stack to freeNodes
    	    freeNodes.push(dependentNode);
	    
	//4. If not, figure out which operator it belongs to
	}else{
	    
	    let dependentOperator;
	    for (const oper of myOperators){
		if (oper.owns(dependentNode)){
		    dependentOperator = oper;
		    break;
		}
	    }
	    if (dependentOperator===undefined)
	    {
		// TODO better error message?
		console.log("Misplaced a node among the operators!");
	    }
	    
	    //5. Call freeNodeSearch on the free nodes of that operator
	    if(!dependentOperator.myInput1.free){
		freeNodeSearch(dependentOperator.myInput2);
		freeNodeSearch(dependentOperator.myOutput);
	    }
	    
	    if(!dependentOperator.myInput2.free){
		freeNodeSearch(dependentOperator.myInput1);
		freeNodeSearch(dependentOperator.myOutput);
	    }
	    
	    if(!dependentOperator.myOutput.free){
		freeNodeSearch(dependentOperator.myInput1);
		freeNodeSearch(dependentOperator.myInput2);
	    }
	}
    } 
}

function pixelToAxisX(coord) {
    return (coord - (width/2)) / 50;
}

function pixelToAxisY(coord) {
    return ((height/2) - coord) / 50;
}

function axisToPixelX(coord) {
    return (coord * 50) + (width/2);
}

function axisToPixelY(coord) {
    return (height/2) - (coord * 50);
}

function touchStarted() {
    if (reversingOperator){
	for (const oper of myOperators){
	    if (oper.beingReversed){
		
		// giving up control of input 1
		if (oper.myInput1.over && oper.myInput1.free){
		    oper.myInput1.free = false;
		    
		    if (!oper.myInput2.free){
          		oper.myInput2.free = true;
        	    }else if (!oper.myOutput.free){
          		oper.myOutput.free = true;
        	    }
		    
        	    oper.reverseMode1 = true;
        	    oper.reverseMode2 = false;
		    
		}
		
		// giving up control of input 2
		if (oper.myInput2.over && oper.myInput2.free){
		    oper.myInput2.free = false;
		    
		    if (!oper.myInput1.free){
          		oper.myInput1.free = true;
        	    }else if (!oper.myOutput.free){
          		oper.myOutput.free = true;
        	    }
		    
        	    oper.reverseMode1 = false;
        	    oper.reverseMode2 = true;
		    
		}
		
		// giving up control of output
		if (oper.myOutput.over && oper.myOutput.free){
		    oper.myOutput.free = false;
		    
		    if (!oper.myInput1.free){
          		oper.myInput1.free = true;
        	    }else if (!oper.myInput2.free){
          		oper.myInput2.free = true;
        	    }
		    
        	    oper.reverseMode1 = false;
        	    oper.reverseMode2 = false;
		}
	    }
	}
	reversingOperator = false;
    }
    
    if(dist(mouseX,mouseY,30,30)<10){
	myOperators.push(new MakeOperator(0));
    }
    if(dist(mouseX,mouseY,30,60)<10){
	myOperators.push(new MakeOperator(1));
    }
    
    pressAndHold = true;
    timerStart = millis();
    
    if(!tappedOnce){
	tappedOnce = true;
	currentTime = millis();
    }else{
	
	//empty freeNode and intermediateNode arrays...
	freeNodes = [];
	intermediateReversals = [];
	
	//check if operator should change kinematic direction...
	for (const oper of myOperators){
	    oper.reverseOperator();
	}
	//if no loose nodes are being reversed, go on to check bindings...
	if (!reversingOperator){
	    for (const stck of myBindings){
		stck.reverseBinding();
	    }
	}
	tappedOnce = false;
    }
    
    for (const oper of myOperators){
	//draggable node?
	oper.clickMe();
	//if we found a draggable node, stop looking
	if (oper.dragging){
	    break;
	}
    }
    
    // FIX: opt out if a number is getting dragged,
    // so we don't get nodes stuck to numbers?
    for (const stck of myBindings){
	//draggable node?
	stck.clickMe();
	//if we found a draggable node, stop looking
	if(stck.dragging){
	    break;
	}
    }
}

function touchMoved() {
    pressAndHold = false;
    return false;
}

function touchEnded(){
    pressAndHold = false
    for (const oper of myOperators){
	oper.allFalse();
    }
    for (const stck of myBindings){
	stck.allFalse();
    }
}
