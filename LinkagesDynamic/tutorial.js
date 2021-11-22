
// array holding sequential level specifications
var myLevels = [];

//counter for incrementing through the tutorials...
var level = 2;

//variables for transformation overlays...
//Anchor is where the mouse sets down
var anchorX;
var anchorY;

var anchorRadius;
var anchorTheta;
var scaleFactor;
var offsetTheta;

//special modes - FIX: move these into level javascript objects?

//input trails
var trail1 = [];
var trail2 = [];
//output trails
var trail3 = [];

var trailLimit = 100;

var input1Radius;
var input1OnCircle = false;
var input2Radius;
var input2OnCircle = false;
var outputRadius;


//Functions for running tutorial levels...

function runTutorial() {


    //set scale
    if(myLevels[level].customScale){
      globalScale = myLevels[level].customScale;
    }else{
      globalScale = 50;
    }



    if(myLevels[level].radians){
        //turn off cartesian coordinates...
        supressCoords = true;
        textSize(20);
        noStroke();
        fill(150);
        for(i=0;i<8;i++){
            ellipse(centerX+globalScale*cos(i*TWO_PI/8),centerY+globalScale*sin(i*TWO_PI/8),10,10)
        }
        text("0",centerX+1.1*globalScale,centerY);
        text("𝝅/4",centerX+1.1*globalScale*cos(-TWO_PI/8),centerY+1.1*globalScale*sin(-TWO_PI/8));
        text("𝝅/2",centerX,centerY+1.1*globalScale*sin(-TWO_PI/4));
        text("3𝝅/4",centerX+1.1*globalScale*cos(-3*TWO_PI/8),centerY+1.1*globalScale*sin(-3*TWO_PI/8));
        text("𝝅",centerX+1.1*globalScale*cos(PI),centerY);
        text("5𝝅/4",centerX+1.1*globalScale*cos(-5*TWO_PI/8),centerY+1.1*globalScale*sin(-5*TWO_PI/8));
        text("3𝝅/2",centerX,centerY+1.1*globalScale*sin(-3*PI/2));
        text("7𝝅/4",centerX+1.1*globalScale*cos(-7*TWO_PI/8),centerY+1.1*globalScale*sin(-7*TWO_PI/8));
    }else if(myLevels[level].degrees){
        //turn off cartesian coordinates...
        supressCoords = true;
        textSize(20);
        noStroke();
        fill(150);
        for(i=0;i<8;i++){
            ellipse(centerX+globalScale*cos(i*TWO_PI/8),centerY+globalScale*sin(i*TWO_PI/8),10,10)
        }
        text("0°",centerX+1.1*globalScale,centerY);
        text("45°",centerX+1.1*globalScale*cos(-TWO_PI/8),centerY+1.1*globalScale*sin(-TWO_PI/8));
        text("90°",centerX,centerY+1.1*globalScale*sin(-TWO_PI/4));
        text("135°",centerX+1.1*globalScale*cos(-3*TWO_PI/8),centerY+1.1*globalScale*sin(-3*TWO_PI/8));
        text("180°",centerX+1.1*globalScale*cos(PI),centerY);
        text("225°",centerX+1.1*globalScale*cos(-5*TWO_PI/8),centerY+1.1*globalScale*sin(-5*TWO_PI/8));
        text("270°",centerX,centerY+1.1*globalScale*sin(-3*PI/2));
        text("315°",centerX+1.1*globalScale*cos(-7*TWO_PI/8),centerY+1.1*globalScale*sin(-7*TWO_PI/8));
    }else{
        supressCoords = false;
    }


    //overlays
    if(myLevels[level].overlay){
        transformOverlay();
    }

    if(myLevels[level].concentricCircles){
        if(myOperators.length==1
            &&myOperators[0].type==MULTIPLIER){

                input1Radius = sqrt(dist(axisToPixelX(myOperators[0].myInput1.real),axisToPixelY(myOperators[0].myInput1.imaginary),centerX,centerY)*dist(axisToPixelX(myOperators[0].myInput1.real),axisToPixelY(myOperators[0].myInput1.imaginary),centerX,centerY));
                input2Radius = sqrt(dist(axisToPixelX(myOperators[0].myInput2.real),axisToPixelY(myOperators[0].myInput2.imaginary),centerX,centerY)*dist(axisToPixelX(myOperators[0].myInput2.real),axisToPixelY(myOperators[0].myInput2.imaginary),centerX,centerY));
                outputRadius = sqrt(dist(axisToPixelX(myOperators[0].myOutput.real),axisToPixelY(myOperators[0].myOutput.imaginary),centerX,centerY)*dist(axisToPixelX(myOperators[0].myOutput.real),axisToPixelY(myOperators[0].myOutput.imaginary),centerX,centerY));


                noFill();

                input1OnCircle = input2OnCircle = false;
                for(i=0;i<20;i++){
                    if(abs(input1Radius-(i*globalScale))<2){
                        input1OnCircle = true;
                    }
                    if(abs(input2Radius-(i*globalScale))<2){
                        input2OnCircle = true;
                    }
                }



                for(i=0;i<30;i++){
                    if((abs(input1Radius-(i*globalScale))<2)
                        ||(abs(input2Radius-(i*globalScale))<2)){
                        stroke(255,100,0,200);
                        strokeWeight(3);
                    }else if(abs(outputRadius-(i*globalScale))<10
                        &&input1OnCircle
                        &&input2OnCircle){
                            stroke(255,0,0,200);
                            strokeWeight(3);
                    }else{
                        stroke(255,100,0,100);
                        strokeWeight(1);
                    }
                    ellipse(centerX,centerY,2*i*globalScale,2*i*globalScale);
                }




                noStroke();
                textSize(15);
                fill(0);

                if(input1OnCircle){
                    text(round(input1Radius/globalScale),axisToPixelX(myOperators[0].myInput1.real),axisToPixelY(myOperators[0].myInput1.imaginary));
                }
                if(input2OnCircle){
                    text(round(input2Radius/globalScale),axisToPixelX(myOperators[0].myInput2.real),axisToPixelY(myOperators[0].myInput2.imaginary));
                }
                if(input1OnCircle&&input2OnCircle){
                    text(round(outputRadius/globalScale),axisToPixelX(myOperators[0].myOutput.real),axisToPixelY(myOperators[0].myOutput.imaginary));
                }

        }
    }

    //side panel for lessons
    fill(35);
    noStroke();
    rect(1300,0,300,height);

    //Top level instructions...
    textAlign(CENTER,CENTER);
    fill(200);
    text(myLevels[level].instructions, 1325, 25, 250, 300);

    //make wedges (should this be separate from "Unit Circle" designation?)
    if(myLevels[level].unitCircle
        &&myOperators.length==1
        &&myOperators[0].type==MULTIPLIER){
            makeWedges();
    }



    //drawing trails...
    if(myOperators.length==1&&myLevels[level].tracers){
        makeTrails();
    }

    //places a dot on the board
    if(myLevels[level].targetDot){
        mouseRadius = sqrt((dist(mouseX,mouseY,centerX,centerY)/globalScale)*(dist(mouseX,mouseY,centerX,centerY)/globalScale));
        fill(0,255,0,100);
        ellipse(axisToPixelX(myLevels[level].outputTargetX),
		axisToPixelY(myLevels[level].outputTargetY),
		25,
		25);
    }

    //message that appears when operator is in the middle of being reversed...
    if(myLevels[level].reverseMessage){
        if(reversingOperator){
            fill(200);
            noStroke();
            textSize(15);
            text(myLevels[level].reverseMessage, 1325, 475, 250, 300);
        }
    }

    //DRO for output
    if(myLevels[level].DRO){
        if(myLevels[level].testComplete()) {
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
        textAlign(CENTER, CENTER);
        if(myOperators.length==1) {
            noStroke();

	    // set readout fill
	    switch (myOperators[0].mode) {
	    case DEFAULT:
	    case COLLAPSED:
		if (myOperators[0].type==ADDER) fill(30,200,255);
		else fill(255,0,0); // MULTIPLIER
		break;
	    case REVCOLLAPSED:
		if (myOperators[0].type==ADDER) fill(200,255,200);
		else fill(255,200,0); // MULTIPLIER
		break;
	    default:
		// what about other operator modes?
	    }

	    // display value
	    let dep = myOperators[0].dependentNode();
	    if (round(dep.imaginary)==0) {
                text(round(dep.real), 1325, 350, 250, 100);
            } else if (round(dep.real)==0) {
                text(round(dep.imaginary) + "i", 1325, 350, 250, 100);
            }else{
                text("(" + round(dep.real) + "," + round(dep.imaginary) + "i)",
		     1325, 350, 250, 100);
            }
	    
        } else if (myOperators.length>1) {
            fill(200);
            textSize(30);
            text("Too many operators on the board.\n Clear, and begin again.",
		 1325, 300, 250, 400);
        }
    }

    //end state for completed level, appearance of "next" button    
    if (myLevels[level].testComplete()) {
        if (myLevels[level].explanation) {
            fill(200);
            noStroke();
            textSize(15);
            text(myLevels[level].explanation, 1325, 475, 250, 300);
            
            fill(150);
            rect(1400,800,100,50,5)
            fill(50);
            textSize(15);
            text("Next",1450,825)
        }else{
            fill(150);
            noStroke();
            rect(1400,475,100,50,5);
            fill(50);
            textSize(15);
            text("Next",1450,500);
        }
    }
}

var input1Angle;
var input2Angle;



//center coordinates for "wedgeCompare" graphic,
var compareX = 1450;
var compareY = 400;

//

//note that wedgeCompare is only called WITHIN makeWedges...
function makeWedges(){

    input1Angle = atan2((axisToPixelY(myOperators[0].myInput1.imaginary)-centerY),(axisToPixelX(myOperators[0].myInput1.real)-centerX))
    input2Angle = atan2((axisToPixelY(myOperators[0].myInput2.imaginary)-centerY),(axisToPixelX(myOperators[0].myInput2.real)-centerX))




    noFill();
    strokeWeight(20);
    strokeCap(SQUARE);
    stroke(255,100,0,100);
    arc(centerX,centerY,globalScale/2,globalScale/2,input1Angle,0);
    stroke(255,200,0,100);
    arc(centerX,centerY,globalScale/3,globalScale/3,input2Angle,0);
    stroke(255,0,0,100);
    arc(centerX,centerY,2*globalScale/3,2*globalScale/3,input1Angle+input2Angle,0);

    if(myLevels[level].wedgeCompare){
        noFill();
        stroke(200);
        strokeWeight(1);
        ellipse(compareX-75,compareY,100,100);
        ellipse(compareX+75,compareY,100,100);

        noStroke();
        fill(200);
        textSize(30);
        text("=",compareX,compareY);


        textSize(20);

        fill(255,100,0,100);
        arc(compareX-75,compareY,100,100,input1Angle,0);

        fill(255,100,0,175);
        text(round(degrees(convertAngleForReadout(input1Angle)))+"°",compareX-40,compareY-75);

        fill(255,200,0,100);
        arc(compareX-75,compareY,100,100,input1Angle+input2Angle,input1Angle);

        fill(255,200,0,175);
        text(round(degrees(convertAngleForReadout(input2Angle)))+"°",compareX-110,compareY-75);

        fill(255,0,0,100);
        arc(compareX+75,compareY,100,100,input1Angle+input2Angle,0);

        fill(255,0,0,175);
        text(round(degrees(convertAngleForReadout(input1Angle+input2Angle)))+"°",compareX+75,compareY-75);

        fill(255,175);
        text("+",compareX-75,compareY-75)

    }

}


function convertAngleForReadout(angle) {
    if(angle<=0){
        return -angle;
    }else if(angle>0){
        return map(angle,0,PI,TWO_PI,PI);
    }
}



var bgAlpha;
var hairlineAlpha;


function transformOverlay(){

    //optional transparency parameter
    if(myLevels[level].overlayAlpha){
        bgAlpha = map(myLevels[level].overlayAlpha,0,100,0,10);
        hairlineAlpha = map(myLevels[level].overlayAlpha,0,100,0,75);
    }else{
        bgAlpha = 10;
        hairlineAlpha = 75;
    }




    //creates animated guides which show the geometry of operator movement...

    if(myOperators.length==1&&myOperators[0].dragging){
       
        //if operator is an adder
        if(myOperators[0].type==ADDER){

            push();

                fill(0,0,255,bgAlpha);
                noStroke();
                rect(0,0,width,height);

                translate(mouseX-anchorX,mouseY-anchorY);

                noFill();
                stroke(100,200,255,hairlineAlpha);
                strokeWeight(1);
                for(i=-20;i<30;i++){
                    line(-width,75*i,width*2,75*i);
                    line(75*i,-height,75*i,height*2);
                }       

            pop();

        //if it's a multiplier
        }else{

            scaleFactor = sqrt((dist(mouseX,mouseY,centerX,centerY)/globalScale)*(dist(mouseX,mouseY,centerX,centerY)/globalScale))/anchorRadius;
            offsetTheta = atan2(mouseY-centerY,mouseX-centerX)-anchorTheta;

            push();

                fill(255,0,0,bgAlpha);
                rect(0,0,width,height);

                translate(centerX,centerY);
                rotate(offsetTheta);
                scale(scaleFactor);

                noFill();
                stroke(255,100,0,hairlineAlpha);
                strokeWeight(1/scaleFactor);

                for(i=0;i<8;i++){
                    line(0,0,1000*cos(i*TWO_PI/8),1000*sin(i*TWO_PI/8));
                }
                for(i=0;i<16;i++){
                    ellipse(0,0,100*i,100*i);
                }

            pop();
        }
    }
}




var trailAlpha


function makeTrails(){

    trail1.push([axisToPixelX(myOperators[0].myInput1.real),axisToPixelY(myOperators[0].myInput1.imaginary)]);
    if(trail1.length>trailLimit){
        trail1.splice(0,1);
    }
    trail2.push([axisToPixelX(myOperators[0].myInput2.real),axisToPixelY(myOperators[0].myInput2.imaginary)]);
    if(trail2.length>trailLimit){
        trail2.splice(0,1);
    }

    trail3.push([axisToPixelX(myOperators[0].myOutput.real),axisToPixelY(myOperators[0].myOutput.imaginary)]);
    if(trail3.length>trailLimit){
        trail3.splice(0,1);
    }

    strokeWeight(3);

    strokeCap(SQUARE);
    for(i=0;i<trail1.length-1;i++){
        trailAlpha = map(i,0,trail1.length,0,255);
        stroke(255,trailAlpha);
        line(trail1[i][0],trail1[i][1],trail1[i+1][0],trail1[i+1][1]);
        line(trail2[i][0],trail2[i][1],trail2[i+1][0],trail2[i+1][1]);
    }

    for(i=0;i<trail2.length-1;i++){
        trailAlpha = map(i,0,trail1.length,0,255);

        if(myOperators[0].type==ADDER){
            stroke(30,200,225,trailAlpha);
        }else{
            stroke(255,0,0,trailAlpha);
        }

        line(trail3[i][0],trail3[i][1],trail3[i+1][0],trail3[i+1][1]);
    }

}



//respond to click events...
function tutorialClick(){


	if(myLevels[level].testComplete()&&(level!=(myLevels.length-1))){
        if(mouseX>1300){
            level++;
        }
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
