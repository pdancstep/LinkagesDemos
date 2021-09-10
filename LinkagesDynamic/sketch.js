var myOperators = []
var myBindings = []

function setup() {
  createCanvas(1400,800)
  textAlign(CENTER,CENTER)

}


var indicator = 50

//holds free nodes that a given node is dependent on (used to display during reversal)
var freeNodes = []
//holds intermediate bound nodes that will need to be made free when reversal happens...
var intermediateReversals = []


//amount to "shift" dependent variable towards better position
var shiftX = 0
var shiftY = 0

//Four directions to check for better position.
var upperY
var lowerY
var leftX
var rightX

//items for multiplier
var denominator

//how far to look in each direction
var searchSize = .1

//how many iterations to run before updating
var iterations = 100


//double tap reference (sketch level)
var tappedOnce = false
var currentTime
var doubleTapTimer = 300

//press and hold references
var pressAndHold = false
var timerStart 
var holdLength = 700

//variables defining first two nodes available for binding...
var lookingForFirstBind = true
var completedBind = false 
var bindingNode1
var bindingNode2
//boolean to distinguish between single-node addition and full merge of two binds...
var bindToBind = false



//boolean for going into state of switching a dependency...
var reversingOperator = false

//extra number of loops for updating positions, helps with rigidity...
var updateCycles = 3


function draw() {

    //manage double tap
    if(tappedOnce){
	if((millis()-currentTime)>doubleTapTimer){
	    tappedOnce=false
	}
    }
    
    //look for bind opportunities
    if(pressAndHold){
  	if((millis()-timerStart)>holdLength){
  	    findNewBind()
  	}
    }
    
    //update nodes and bindings multiple times, so they have a chance to react to each other...
    for(m=0;m<updateCycles;m++){
	
	//update components on board
	for(k=0;k<myOperators.length;k++){
	    myOperators[k].overMe()
	    myOperators[k].update()
	}
	
	for(k=0;k<myBindings.length;k++){
	    myBindings[k].overMe()
	    myBindings[k].update()
	}
    }
    
    //draw board
    background(indicator)
    
    //background
    noFill()
    stroke(200)
    strokeWeight(1)
    line(0,height/2,width,height/2)
    line(width/2,0,width/2,height)
    ellipse(width/2,height/2,100,100)
    
    //buttons
    noStroke()
    fill(30,200,255)
    ellipse(30,30,20,20)
    fill(255,100,0)
    ellipse(30,60,20,20)
    
    //draw operators
    for(k=0;k<myOperators.length;k++){
	myOperators[k].display()
    }
    
    //draw bound nodes
    for(k=0;k<myBindings.length;k++){
	myBindings[k].display()
    }
    
    
    //coordinate data
    fill(150)
    noStroke()
    for(i=-15;i<16;i++){
	text(i,width/2+i*50,height/2-16)
	text(-i+"i",width/2-20,height/2+i*50)
	ellipse(width/2+i*50,height/2,5,5)
	ellipse(width/2,height/2+i*50,5,5)
    }
    
    if(indicatorFlash){
	background(0)
	indicatorFlash = false
    }
    
    //display mode while alternative dependency...
    if(reversingOperator){
	background(0,150)
	for(k=0;k<freeNodes.length;k++){
	    freeNodes[k].freeNodeDisplay()
	}
    }
    
    fill(255)
    noStroke()
    for(k=0;k<freeNodes.length;k++){
	text(freeNodes[k].real,100,100+30*k)
    }   
}

var indicatorFlash = false

//function that searches for two uncoupled nodes to bind and initiate a new stack...
function findNewBind(){

    //initialize that we're looking for first bind
    lookingForFirstBind = true
    //..and that our search is not yet complete
    completedBind = false
    //..and that we start out assuming there's an unstacked node...
    bindToBind = false 
    
    //first look through all non-bound nodes...
    for(s=0;s<myOperators.length;s++){
	
	if(myOperators[s].myInput1.over&&!myOperators[s].myInput1.inStack){
	    if(lookingForFirstBind){
		bindingNode1 = myOperators[s].myInput1
		lookingForFirstBind = false
		continue
	    }else{
		if(bindingNode1.free||(!bindingNode1.free&&myOperators[s].myInput1.free)){
		    bindingNode2 = myOperators[s].myInput1
		    bind1()
		    completedBind = true
		    break
		}
	    }
	}
	
	if(myOperators[s].myInput2.over&&!myOperators[s].myInput2.inStack){
	    if(lookingForFirstBind){
		bindingNode1 = myOperators[s].myInput2
		lookingForFirstBind = false
		continue
	    }else{
		if(bindingNode1.free||(!bindingNode1.free&&myOperators[s].myInput2.free)){
		    bindingNode2 = myOperators[s].myInput2
		    bind1()
		    completedBind = true
		    break
		}
	    }
	}
	
	if(myOperators[s].myOutput.over&&!myOperators[s].myOutput.inStack){
	    if(lookingForFirstBind){
		bindingNode1 = myOperators[s].myOutput
		lookingForFirstBind = false
		continue
	    }else{
		if(bindingNode1.free||(!bindingNode1.free&&myOperators[s].myOutput.free)){
		    bindingNode2 = myOperators[s].myOutput
		    bind1()
		    completedBind = true
		    break
		}
	    }
	}
    }
    
    //at this stage we may have:
    //1) completed a bind (completedBind = true) => do nothing
    //2) have one bindable node (lookingForFirstBind = false) => will add this node to .myStack of an existing binding
    //3) have no possible bindings yet (lookingForFirstBind = true) => will add the elements of one .myStack to the other binding's .myStack
    
    if(!completedBind){
	for(s=0;s<myBindings.length;s++){
	    
	    if(myBindings[s].over){
		
		if(lookingForFirstBind){
		    bindingNode1 = myBindings[s]
		    lookingForFirstBind = false
		    bindToBind = true
		    continue
		    
		}else{
		    
		    if(bindingNode1.free||(!bindingNode1.free&&myBindings[s].free)){
			bindingNode2 = myBindings[s]
			
			//if we're adding a node to an existing stack...
			if(!bindToBind){
			    bind2()
			    
			    //if we'er merging two stacks...
			}else{
			    bind3()
			}
			
			completedBind = true
			break
		    }
		}
	    }
	}
    }	
}

//bind two nodes, initiating a stack
function bind1(){
    indicatorFlash = true
    bindingNode1.inStack = bindingNode2.inStack = true
    myBindings.push(new MakeBinding(bindingNode1,bindingNode2))
}
//add a node to an existing stack
function bind2(){
    indicatorFlash = true
    bindingNode1.inStack = true
    //just reuse "s" variable from where for loop broke?
    myBindings[s].myStack.push(bindingNode1)
    //update free status of stack
    myBindings[s].amIFree()
}
//merge two stacks
function bind3(){
    indicatorFlash = true
    for(t=0;t<myBindings[s].myStack.length;t++){
	bindingNode1.myStack.push(myBindings[s].myStack[t])
    }
    //update free status of stack
    bindingNode1.amIFree()
    //erase old stack
    myBindings.splice(s,1)
}


//index of dependent node in stack in myBindings[n].myStack
var dependentNodeIndex
//index of operator containing dependent node
var dependentOperatorIndex


//chases down all free nodes on which the given node is dependent (starting with the other two nodes in the given operator)
function freeNodeSearch(node){
    //function is always called on a free node - if that node isn't in a stack add it to our freeNodes array
    if(!node.inStack){
	freeNodes.push(node)
    }else{
	
	//1. Determine which stack the node is in
	var bindingIndex = -1
	for(a=0;a<myBindings.length;a++){
    	    if(myBindings[a].myStack.includes(node)){
    		if(bindingIndex>=0){
    		    //error message
    		}
    		bindingIndex = a
    	    }
	}
	//Check if bindinIndex is less than zero -> error
	
	//2. Figure out if that stack is free
	if(myBindings[bindingIndex].free){
	    
	    //3. If so add top of stack to freeNodes
    	    freeNodes.push(myBindings[bindingIndex].myStack[0])
	    
	    
	    //4. If not, figure out the index of dependent node in the stack...
	}else{
	    
	    for(a=0;a<myBindings[bindingIndex].myStack.length;a++){
		if(!myBindings[bindingIndex].myStack[a].free){
    		    dependentNodeIndex = a
    		}
	    }
	    
	    //6. And figure out which operator it belongs to...
	    for(a=0;a<myOperators.length;a++){
		if(myOperators[a].myInput1==myBindings[bindingIndex].myStack[dependentNodeIndex]||
		   myOperators[a].myInput2==myBindings[bindingIndex].myStack[dependentNodeIndex]||
		   myOperators[a].myOutput==myBindings[bindingIndex].myStack[dependentNodeIndex]){
		    
		    dependentOperatorIndex = a
		    
		}
		
		//5. Call freeNodeSearch on the free nodes of that operatorr...
		if(!myOperators[dependentOperatorIndex].myInput1.free){
		    freeNodeSearch(myOperators[dependentOperatorIndex].myInput2)
		    freeNodeSearch(myOperators[dependentOperatorIndex].myOutput)
		}
		
		if(!myOperators[dependentOperatorIndex].myInput2.free){
		    freeNodeSearch(myOperators[dependentOperatorIndex].myInput1)
		    freeNodeSearch(myOperators[dependentOperatorIndex].myOutput)
		}
		
		if(!myOperators[dependentOperatorIndex].myOutput.free){
		    freeNodeSearch(myOperators[dependentOperatorIndex].myInput1)
		    freeNodeSearch(myOperators[dependentOperatorIndex].myInput2)
		}
	    }
	} 
    }
}


function global2StageX(coord){
	return coord + width/2
}
function global2StageY(coord){
	return coord + height/2
}
function stage2GlobalX(coord){
	return coord - width/2
}
function stage2GlobalY(coord){
	return coord - height/2
}


function touchStarted() {
    
    if(reversingOperator){
	for(k=0;k<myOperators.length;k++){
	    if(myOperators[k].beingReversed){
		
		
		//giving up control of input 1
		if(myOperators[k].myInput1.over&&myOperators[k].myInput1.free){
		    myOperators[k].myInput1.free = false 
		    
		    if(!myOperators[k].myInput2.free){
          		myOperators[k].myInput2.free = true
        	    }else if(!myOperators[k].myOutput.free){
          		myOperators[k].myOutput.free = true
        	    }
		    
        	    myOperators[k].reverseMode1 = true
        	    myOperators[k].reverseMode2 = false
		    
		}
		
		//giving up control of input 2
		if(myOperators[k].myInput2.over&&myOperators[k].myInput2.free){
		    myOperators[k].myInput2.free = false 
		    
		    if(!myOperators[k].myInput1.free){
          		myOperators[k].myInput1.free = true
        	    }else if(!myOperators[k].myOutput.free){
          		myOperators[k].myOutput.free = true
        	    }
		    
        	    myOperators[k].reverseMode1 = false
        	    myOperators[k].reverseMode2 = true
		    
		}
		
		//giving up control of output
		if(myOperators[k].myOutput.over&&myOperators[k].myOutput.free){
		    myOperators[k].myOutput.free = false 
		    
		    if(!myOperators[k].myInput1.free){
          		myOperators[k].myInput1.free = true
        	    }else if(!myOperators[k].myInput2.free){
          		myOperators[k].myInput2.free = true
        	    }
		    
        	    myOperators[k].reverseMode1 = false
        	    myOperators[k].reverseMode2 = false
		    
		}
		
	    }
	}
	reversingOperator = false
    }
    
    
    
    if(dist(mouseX,mouseY,30,30)<10){
	myOperators.push(new MakeOperator(0))
    }
    if(dist(mouseX,mouseY,30,60)<10){
	myOperators.push(new MakeOperator(1))
    }
    
    pressAndHold = true
    timerStart = millis()
    
    if(!tappedOnce){
	tappedOnce = true
	currentTime = millis()
    }else{
	
	//empty freeNode and intermediateNode arrays...
	freeNodes = []
	intermediateReversals = []
	
	//check if operator should change kinematic direction...
	for(k=0;k<myOperators.length;k++){
	    myOperators[k].reverseOperator()
	}
	//if no loose nodes are being reversed, go on to check bindings...
	if(!reversingOperator){
	    for(k=0;k<myBindings.length;k++){
		myBindings[k].reverseBinding()
	    }
	}
	tappedOnce = false
    }
    
    for(k=0;k<myOperators.length;k++){
	//draggable node?
	myOperators[k].clickMe()
	//if we found a draggable node, stop looking
	if(myOperators[k].dragging){
	    break
	}
    }
    
    //FIX: opt out if a number is getting dragged, so we don't get nodes stuck to numbers?
    for(k=0;k<myBindings.length;k++){
	//draggable node?
	myBindings[k].clickMe()
	//if we found a draggable node, stop looking
	if(myBindings[k].dragging){
	    break
	}
    }
    
}

function touchMoved() {
    pressAndHold = false
    return false
}

function touchEnded(){
    pressAndHold = false
    for(k=0;k<myOperators.length;k++){
	myOperators[k].allFalse()
    }
    for(k=0;k<myBindings.length;k++){
	myBindings[k].allFalse()
    }
}
