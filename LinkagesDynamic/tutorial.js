//Functions for running tutorial levels/problems...

function runTutorial(){

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