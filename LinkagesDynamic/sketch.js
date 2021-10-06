function setup() {
    createCanvas(1400,800);
    textAlign(CENTER,CENTER);
}

// ???
const indicator = 50;


//how far to look in each direction
const searchSize = .1;

//how many iterations to run before updating
const iterations = 100;

//extra number of loops for updating positions, helps with rigidity...
const updateCycles = 3;


//double tap reference (sketch level)
var tappedOnce = false;
var currentTime;
var doubleTapTimer = 300;

//press and hold references
var pressAndHold = false;
var timerStart ;
var holdLength = 700;

// mode-switch boolean, for going into state of switching a dependency
var reversingOperator = false;

var indicatorFlash = false;

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
  	    findMerge();
  	}
    }
    
    // update operators multiple times,
    // so they have a chance to react to each other
    for (m=0; m<updateCycles; m++){
	for (const oper of myOperators) {
	    oper.checkMouseover();
	    oper.update();
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
    if (reversingOperator) {
	closeReversal();
    }
    
    if (dist(mouseX,mouseY,30,30)<10){
	myOperators.push(new Operator(ADDER));
    }
    if (dist(mouseX,mouseY,30,60)<10){
	myOperators.push(new Operator(MULTIPLIER));
    }
    
    pressAndHold = true;
    timerStart = millis();
    
    if(!tappedOnce){
	tappedOnce = true;
	currentTime = millis();
    }else{
	tryReversal();
	tappedOnce = false;
    }

    for (const oper of myOperators){
	oper.notifyClick();
    }
}

function touchMoved() {
    pressAndHold = false;
    return false;
}

function touchEnded(){
    pressAndHold = false;
    for (const oper of myOperators){
	oper.notifyRelease();
    }
}
