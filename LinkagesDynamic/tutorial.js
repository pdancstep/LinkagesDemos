
// array holding sequential level specifications
var myLevels = [];

//counter for incrementing through the tutorials...
var level = 0;

//variables for transformation overlays...
//Anchor is where the mouse sets down
var anchorX;
var anchorY;

var anchorRadius;
var anchorTheta;
var scaleFactor;
var offsetTheta;

//special modes - FIX: move these into level javascript objects?

var overlay = false;


var cartesianDemo = false;
var polarDemo = false;

var trails = false;

var trail1 = []
var trail2 = []

var trailLimit = 100



//Functions for running tutorial levels...

function runTutorial(){


	//side panel for lessons
    fill(35);
    rect(1300,0,300,height);

    //Top level instructions...
    textAlign(CENTER,CENTER);
    fill(200);
    text(myLevels[level].instructions, 1325, 25, 250, 300);

    //drawing trails...
    if(myOperators.length==1&&myLevels[level].tracers){
        makeTrails();
    }

    if(myLevels[level].targetDot){
        fill(0,255,0,100);
        ellipse(axisToPixelX(myLevels[level].outputTargetX),axisToPixelY(myLevels[level].outputTargetY),25,25)
    }



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

function transformOverlay(){

    //creates animated guides which show the geometry of operator movement...

    if(myOperators.length==1&&myOperators[0].dragging){
       
        //if operator is an adder
        if(myOperators[0].type==ADDER){

            push();

                fill(0,0,255,10);
                noStroke();
                rect(0,0,width,height);

                translate(mouseX-anchorX,mouseY-anchorY);

                noFill();
                stroke(100,200,255,75);
                strokeWeight(1);
                for(i=-20;i<20;i++){
                    line(-width,75*i,width*2,75*i);
                    line(75*i,-height,75*i,height*2);
                }       

            pop();

        //if it's a multiplier
        }else{

            scaleFactor = sqrt((dist(mouseX,mouseY,centerX,centerY)/globalScale)*(dist(mouseX,mouseY,centerX,centerY)/globalScale))/anchorRadius;
            offsetTheta = atan2(mouseY-centerY,mouseX-centerX)-anchorTheta;

            push();

                fill(255,0,0,10);
                rect(0,0,width,height);

                translate(centerX,centerY);
                rotate(offsetTheta);
                scale(scaleFactor);

                noFill();
                stroke(255,100,0,75);
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


function makeTrails(){

    trail1.push([axisToPixelX(myOperators[0].myInput1.real),axisToPixelY(myOperators[0].myInput1.imaginary)]);
    if(trail1.length>trailLimit){
        trail1.splice(0,1);
    }
    trail2.push([axisToPixelX(myOperators[0].myOutput.real),axisToPixelY(myOperators[0].myOutput.imaginary)]);
    if(trail2.length>trailLimit){
        trail2.splice(0,1);
    }

    strokeWeight(3);

    stroke(255);
    for(i=0;i<trail1.length-1;i++){
        line(trail1[i][0],trail1[i][1],trail1[i+1][0],trail1[i+1][1]);
    }
    if(myOperators[0].type==ADDER){
        stroke(30,200,225);
    }else{
        stroke(255,0,0)
    }
    for(i=0;i<trail2.length-1;i++){
        line(trail2[i][0],trail2[i][1],trail2[i+1][0],trail2[i+1][1]);
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
