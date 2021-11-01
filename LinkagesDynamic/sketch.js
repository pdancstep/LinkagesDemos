function setup() {
    createCanvas(1600,900);
}

// ???
const indicator = 50;


//how far to look in each direction
const searchSize = .1;

//how many iterations to run before updating
const iterations = 100;

//extra number of loops for updating positions, helps with rigidity...
const updateCycles = 3;


//center coords.
const centerX = 650
const centerY = 450
//global scale (standard, 50px = 1 unit)
const globalScale = 50



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

//counter for incrementing through the tutorials...
var level = 0;


//variables for transformation overlays...
//Anchor is where the mouse sets down
var anchorX;
var anchorY;

var anchorRadius
var anchorTheta
var scaleFactor
var offsetTheta





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
    
    background(indicator);

    //background grid
    for (i=-20; i<20; i++){
        strokeWeight(1);
        stroke(75);
        noFill();
        line(centerX+i*globalScale,0,centerX+i*globalScale,height);
        line(0,centerY+i*globalScale,width,centerY+i*globalScale);
    }
    
    //axes,unit circle
    noFill();
    stroke(200);
    strokeWeight(1);
    line(0,centerY,width,centerY);
    line(centerX,0,centerX,height);
    ellipse(centerX,centerY,100,100); // unit circle
    




    //transfrom overlays
    /*
    if(myOperators.length==1&&myOperators[0].dragging){
       
        //if operator is an adder
        if(myOperators[0].type==ADDER){

            push()

                fill(0,0,255,10)
                noStroke()
                rect(0,0,width,height)

                translate(mouseX-anchorX,mouseY-anchorY)

                noFill()
                stroke(100,200,255,75)
                strokeWeight(1)
                for(i=-20;i<20;i++){
                    line(-width,75*i,width*2,75*i)
                    line(75*i,-height,75*i,height*2)
                }       

            pop()

        //if it's a multiplier
        }else{

            scaleFactor = sqrt((dist(mouseX,mouseY,centerX,centerY)/globalScale)*(dist(mouseX,mouseY,centerX,centerY)/globalScale))/anchorRadius;
            offsetTheta = atan2(mouseY-centerY,mouseX-centerX)-anchorTheta

            push()

                fill(255,0,0,10)
                rect(0,0,width,height)

                translate(centerX,centerY)
                rotate(offsetTheta)
                scale(scaleFactor)

                noFill()
                stroke(255,100,0,75)
                strokeWeight(1/scaleFactor)

                for(i=0;i<8;i++){
                    line(0,0,1000*cos(i*TWO_PI/8),1000*sin(i*TWO_PI/8))
                }
                for(i=0;i<16;i++){
                    ellipse(0,0,100*i,100*i)
                }

            pop()

        }

    }
    */



    //draw operators
    for (const oper of myOperators) {
    oper.display();
    }


    
    //coordinate data

    textSize(15);
    textAlign(CENTER,CENTER);
    for (i=-20; i<20; i++){
        fill(150);
        noStroke();
    	text(i, centerX+i*globalScale, centerY-16);
    	text(-i+"i", centerX-20, centerY+i*globalScale);
    	ellipse(centerX+i*globalScale, centerY, 5, 5);
    	ellipse(centerX, centerY+i*globalScale, 5, 5);
    }



    //buttons
    textSize(15);
    textAlign(LEFT,CENTER);


    noStroke();
    fill(200)
    ellipse(30,30,20,20);
    text("clear",45,30);

    fill(30,200,255);
    ellipse(30,60,20,20);
    text("adder",45,60);

    fill(255,100,0);
    ellipse(30,90,20,20);
    text("multiplier",45,90);






    
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










    //On-canvas DRO

    textAlign(CENTER,CENTER);
    textSize(30);
    for(i=0;i<myOperators.length;i++){

        fill(150)
        
        text("("+round(myOperators[i].myInput1.real)+","+round(myOperators[i].myInput1.imaginary)+"i)",50,height-40*(i+1));

        if(myOperators[i].type==ADDER){
            text("+",115,height-40*(i+1));
        }else{
            text("x",115,height-40*(i+1));
        }

        text("("+round(myOperators[i].myInput2.real)+","+round(myOperators[i].myInput2.imaginary)+"i)",175,height-40*(i+1));

        text("=",230,height-40*(i+1));
        
        if(myOperators[i].type==ADDER){
            fill(30,200,255);
        }else{
            fill(255,0,0);
        }
        text("("+round(myOperators[i].myOutput.real)+","+round(myOperators[i].myOutput.imaginary)+"i)",285,height-40*(i+1));


    }



    //side panel for lessons
    fill(35);
    rect(1300,0,300,height);

    //Top level instructions...
    textAlign(CENTER,CENTER);
    fill(200);
    text(myLevels[level].instructions, 1325, 25, 250, 300);


    //DRO for output
    if(myLevels[level].DRO){
        if(myLevels[level].testComplete()){
            fill(100);
            stroke(0,255,0);
            rect(1360,360,170,80);
            noStroke();
            fill(0,255,0);
            ellipse(1550,400,25,25);
            textAlign(LEFT,BOTTOM);
            textSize(12);
            text("Correct answer", 1360, 360);
        }else{
            fill(100);
            noStroke();
            rect(1360,360,170,80);
            ellipse(1550,400,25,25);
            textAlign(LEFT,BOTTOM);
            textSize(12);
            text("Current output", 1360, 360);
        }
    

        //readout of dependent variable
        textSize(50)
        textAlign(CENTER,CENTER);
        if(myOperators.length==1){

            noStroke();

            if(myOperators[0].type==ADDER){
                if(myOperators[0].mode==DEFAULT||myOperators[0].mode==COLLAPSED){
                    
                    fill(30,200,255);

                    if(round(myOperators[0].myOutput.imaginary)==0){
                        text(round(myOperators[0].myOutput.real),1325, 350, 250, 100);
                    }else if(round(myOperators[0].myOutput.real)==0){
                        text(round(myOperators[0].myOutput.imaginary)+"i", 1325, 350, 250, 100);
                    }else{
                        text("("+round(myOperators[0].myOutput.real)+","+round(myOperators[0].myOutput.imaginary)+"i)",1325, 350, 250, 100);
                    }

                }else if(myOperators[0].mode==REVCOLLAPSED){
                    fill(200,255,200);

                    if(round(myOperators[0].myInput1.imaginary)==0){
                        text(round(myOperators[0].myInput1.real),1325, 350, 250, 100);
                    }else if(round(myOperators[0].myInput1.real)==0){
                        text(round(myOperators[0].myInput1.imaginary)+"i", 1325, 350, 250, 100);
                    }else{
                        text("("+round(myOperators[0].myInput1.real)+","+round(myOperators[0].myInput1.imaginary)+"i)",1325, 350, 250, 100);
                    }



                }
            //If output is from multiplier...
            }else {

                if(myOperators[0].mode==DEFAULT||myOperators[0].mode==COLLAPSED){
                    fill(255,0,0);

                    if(round(myOperators[0].myOutput.imaginary)==0){
                        text(round(myOperators[0].myOutput.real),1325, 350, 250, 100);
                    }else if(round(myOperators[0].myOutput.real)==0){
                        text(round(myOperators[0].myOutput.imaginary)+"i", 1325, 350, 250, 100);
                    }else{
                        text("("+round(myOperators[0].myOutput.real)+","+round(myOperators[0].myOutput.imaginary)+"i)",1325, 350, 250, 100);
                    }
                }else if(myOperators[0].mode==REVCOLLAPSED){
                    fill(255,200,0);

                    if(round(myOperators[0].myInput1.imaginary)==0){
                        text(round(myOperators[0].myInput1.real),1325, 350, 250, 100);
                    }else if(round(myOperators[0].myInput1.real)==0){
                        text(round(myOperators[0].myInput1.imaginary)+"i", 1325, 350, 250, 100);
                    }else{
                        text("("+round(myOperators[0].myInput1.real)+","+round(myOperators[0].myInput1.imaginary)+"i)",1325, 350, 250, 100);
                    }
                }

            }


        }else if(myOperators.length>1){
            fill(200);
            textSize(30);
            text("Too many operators on the board.\n Clear, and begin again.", 1325, 300, 250, 400);
        }
    }



    //end state for completed level, appearance of "next" button    
    if(myLevels[level].testComplete()){
        if(myLevels[level].explanation){
            fill(200);
            textSize(15);
            text(myLevels[level].explanation, 1325, 475, 250, 300);
            
            fill(150)
            rect(1400,800,100,50,5)
            fill(50)
            textSize(15);
            text("Next",1450,825)
        }else{
            fill(150);
            rect(1400,475,100,50,5);
            fill(50);
            textSize(15);
            text("Next",1450,500);
        }
    }




}

function pixelToAxisX(coord) {
    return (coord - centerX) / globalScale;
}

function pixelToAxisY(coord) {
    return (centerY - coord) / globalScale;
}

function axisToPixelX(coord) {
    return (coord * globalScale) + centerX;
}

function axisToPixelY(coord) {
    return centerY - (coord * globalScale);
}

function touchStarted() {

    if (reversingOperator) {
	closeReversal();
    }
    
    if (dist(mouseX,mouseY,30,30)<10){
    myOperators = [];
    }
    if (dist(mouseX,mouseY,30,60)<10){
	new Operator(ADDER);
    }
    if (dist(mouseX,mouseY,30,90)<10){
	new Operator(MULTIPLIER);
    }

    if(myLevels[level].testComplete()&&(level!=(myLevels.length-1))){
        if(mouseX>1300){
            level++;
        }
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

    //reference variables for transform overlay 
    //FIX: Make this conditional depending on level detials?
    if(myOperators.length==1&&myOperators[0].dragging){
        
        if(myOperators[0].type==ADDER){
            anchorX = mouseX;
            anchorY = mouseY;
        //if operator is a multiplier
        }else{
            anchorRadius = sqrt((dist(mouseX,mouseY,centerX,centerY)/globalScale)*(dist(mouseX,mouseY,centerX,centerY)/globalScale));
            anchorTheta = atan2(mouseY-centerY,mouseX-centerX);
        }
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
