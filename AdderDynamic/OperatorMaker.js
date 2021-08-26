function MakeOperator() {


  this.myInput1 = new MakeNumber(100,200,true)
  this.myInput2 = new MakeNumber(200,100,true)

  this.myOutput = new MakeNumber(200,200,false)

  //mode booleans for backdriving input 1 and input 2
  this.reverseMode1 = false
  this.reverseMode2 = false

  //booleans for collapsed operator and its' forward/backward kinematics...
  this.collapsed = false
  this.reverseCollapsed = false


  //checks each of its inputs to see if the mouse is currently hovering over...
  this.overMe = function(){
    this.myInput1.overMe()
    this.myInput2.overMe()
    this.myOutput.overMe()
  }


  //checks to see if mouse is over any nodes
  this.clickMe = function(){
    this.myInput1.clickMe()
    this.myInput2.clickMe()
    this.myOutput.clickMe()
  }


  this.allFalse = function(){
    this.myInput1.dragging = false
    this.myInput2.dragging = false
    this.myOutput.dragging = false
  }


  //double click on nodes to control dependencies...
  this.modeChange = function(){

    //FOR NOW: set this up as double click on free variable in order to bind it...

    //Mode changes for uncollapsed adder...
    //FIX: should these be "else ifs" to prevent multiple mode switches at once?
    if(!this.collapsed){
      //double click on input1
      if(this.myInput1.over&&this.myInput1.free){

        //make input1 dependent
        this.myInput1.free = false

        //free up whichever other node is currently bound
        if(!this.myInput2.free){
          this.myInput2.free = true
        }else if(!this.myOutput.free){
          this.myOutput.free = true
        }

        //change to appropriate dependency mode
        this.reverseMode1 = true
        this.reverseMode2 = false

      }

      //double click on input2
      if(this.myInput2.over&&this.myInput2.free){

        //make input2 dependent
        this.myInput2.free = false

        //free up whichever other node is currently bound
        if(!this.myInput1.free){
          this.myInput1.free = true
        }else if(!this.myOutput.free){
          this.myOutput.free = true
        }

        //change to appropriate dependency mode
        this.reverseMode1 = false
        this.reverseMode2 = true
        
      }

      //double click on output
      if(this.myOutput.over&&this.myOutput.free){

        //make output dependent
        this.myOutput.free = false

        //free up whichever other node is currently bound
        if(!this.myInput1.free){
          this.myInput1.free = true
        }else if(!this.myInput2.free){
          this.myInput2.free = true
        }

        //change to appropriate dependency mode
        this.reverseMode1 = false
        this.reverseMode2 = false
        
      }



    //mode changes for collapsed adder
    }else{

      //double click on input1
      if(this.myInput1.over&&this.myInput1.free){

        //make input1 dependent
        this.myInput1.free = false

        //free up the output node...
        this.myOutput.free = true

        //change to appropriate dependency mode
        this.reverseCollapsed = true

      }

      //double click on output
      if(this.myOutput.over&&this.myOutput.free){

        //make output dependent
        this.myOutput.free = false
        //free up input 1
        this.myInput1.free = true

        //change to appropriate dependency mode
        this.reverseCollapsed = false

      }





    }


  }

  this.update = function(){

    //check if this operator is being collapsed via press-and-hold...
    if(this.myInput1.over&&this.myInput2.over){
      if(pressAndHold){
        if((millis()-timerStart)>holdLength){
          this.collapsed = true
          this.myInput1.free = true
          this.myOutput.free = false
        }
      }
    }


    //update possibly dragging numbers
    this.myInput1.update()
    this.myInput2.update()
    this.myOutput.update()

    for(i=0;i<iterations;i++){
      this.propagateOutput()
    }

  }


  this.compareShifts = function(){
    if(abs(leftX)<abs(rightX)){
      shiftX = shiftX - 1
    }else if(abs(leftX)>abs(rightX)){
      shiftX = shiftX + 1
    }

    if(abs(upperY)<abs(lowerY)){
      shiftY = shiftY + 1
    }else if(abs(upperY)>abs(lowerY)){
      shiftY = shiftY - 1
    }
  }


  this.propagateOutput = function(){
    //assume no shifting
    shiftX=0
    shiftY=0


    //for uncollapsed operator
    if(!this.collapsed){


      if(!this.reverseMode1&&!this.reverseMode2){

        //check whether moving left or right gives a better fit to constraints...
        leftX = (this.myOutput.real-searchSize)-(this.myInput1.real+this.myInput2.real)
        rightX = (this.myOutput.real+searchSize)-(this.myInput1.real+this.myInput2.real)

        //...same for up or down movement...
        upperY = (this.myOutput.imaginary+searchSize)-(this.myInput1.imaginary+this.myInput2.imaginary)
        lowerY = (this.myOutput.imaginary-searchSize)-(this.myInput1.imaginary+this.myInput2.imaginary)

        //decide whether/where to shift ouput position...
        this.compareShifts()
        this.myOutput.real = this.myOutput.real+shiftX
        this.myOutput.imaginary = this.myOutput.imaginary+shiftY

      
      }else if(this.reverseMode1){

        leftX = (this.myInput1.real-searchSize)-(this.myOutput.real-this.myInput2.real)
        rightX = (this.myInput1.real+searchSize)-(this.myOutput.real-this.myInput2.real)
        upperY = (this.myInput1.imaginary+searchSize)-(this.myOutput.imaginary-this.myInput2.imaginary)
        lowerY = (this.myInput1.imaginary-searchSize)-(this.myOutput.imaginary-this.myInput2.imaginary)

        this.compareShifts()
        this.myInput1.real = this.myInput1.real+shiftX
        this.myInput1.imaginary = this.myInput1.imaginary+shiftY


      }else if(this.reverseMode2){

        leftX = (this.myInput1.real-searchSize)-(this.myOutput.real-this.myInput2.real)
        rightX = (this.myInput1.real+searchSize)-(this.myOutput.real-this.myInput2.real)
        upperY = (this.myInput2.imaginary+searchSize)-(this.myOutput.imaginary-this.myInput1.imaginary)
        lowerY = (this.myInput2.imaginary-searchSize)-(this.myOutput.imaginary-this.myInput1.imaginary)

        this.compareShifts()
        this.myInput2.real = this.myInput2.real+shiftX
        this.myInput2.imaginary = this.myInput2.imaginary+shiftY

      }


    //for collapsed operator
    }else{


      if(!this.reverseCollapsed){

        leftX = (this.myOutput.real-searchSize)-(2*this.myInput1.real)
        rightX = (this.myOutput.real+searchSize)-(2*this.myInput1.real)
        upperY = (this.myOutput.imaginary+searchSize)-(2*this.myInput1.imaginary)
        lowerY = (this.myOutput.imaginary-searchSize)-(2*this.myInput1.imaginary)

        this.compareShifts()
        this.myOutput.real = this.myOutput.real+shiftX
        this.myOutput.imaginary = this.myOutput.imaginary+shiftY

      }else{

        leftX = (this.myInput1.real-searchSize)-(.5*this.myOutput.real)
        rightX = (this.myInput1.real+searchSize)-(.5*this.myOutput.real)
        upperY = (this.myInput1.imaginary+searchSize)-(.5*this.myOutput.imaginary)
        lowerY = (this.myInput1.imaginary-searchSize)-(.5*this.myOutput.imaginary)

        this.compareShifts()
        this.myInput1.real = this.myInput1.real+shiftX
        this.myInput1.imaginary = this.myInput1.imaginary+shiftY

      }

    }

  }



  this.display = function(){
    
    //display for uncollapsed operator...
    if(!this.collapsed){
      noFill()
      stroke(30,200,225)

      //parallelogram
      beginShape()
        vertex(width/2,height/2)
        vertex(global2StageX(this.myInput1.real), global2StageY(this.myInput1.imaginary))
        vertex(global2StageX(this.myOutput.real), global2StageY(this.myOutput.imaginary))
        vertex(global2StageX(this.myInput2.real), global2StageY(this.myInput2.imaginary))
      endShape(CLOSE)

      //nodes

      fill(200,255,255)
      
      ellipse(global2StageX(this.myInput1.real),global2StageY(this.myInput1.imaginary),15,15)
      fill(200,255,255)
      ellipse(global2StageX(this.myInput2.real),global2StageY(this.myInput2.imaginary),15,15)
      fill(30,200,255)
      ellipse(global2StageX(this.myOutput.real),global2StageY(this.myOutput.imaginary),15,15)


      //draggable node rings
      noFill()
      stroke(255,200)
      strokeWeight(3)

      if(!this.reverseMode1&&!this.reverseMode2){
        ellipse(global2StageX(this.myInput1.real),global2StageY(this.myInput1.imaginary),20,20)
        ellipse(global2StageX(this.myInput2.real),global2StageY(this.myInput2.imaginary),20,20)
      }else if(this.reverseMode1){
        ellipse(global2StageX(this.myInput2.real),global2StageY(this.myInput2.imaginary),20,20)
        ellipse(global2StageX(this.myOutput.real),global2StageY(this.myOutput.imaginary),20,20)
      }else if(this.reverseMode2){
        ellipse(global2StageX(this.myInput1.real),global2StageY(this.myInput1.imaginary),20,20)
        ellipse(global2StageX(this.myOutput.real),global2StageY(this.myOutput.imaginary),20,20)
      }


    //display for collapsed operator...
    }else{

      noFill()
      stroke(30,200,225)

      //line...
      line(width/2,height/2,global2StageX(this.myOutput.real), global2StageY(this.myOutput.imaginary))

      //nodes

      //fill(200,255,255)
      fill(0)
      ellipse(global2StageX(this.myInput1.real),global2StageY(this.myInput1.imaginary),15,15)
      fill(30,200,255)
      ellipse(global2StageX(this.myOutput.real),global2StageY(this.myOutput.imaginary),15,15)


      //draggable node rings
      noFill()
      stroke(255,200)
      strokeWeight(3)

      if(!this.reverseCollapsed){
        ellipse(global2StageX(this.myInput1.real),global2StageY(this.myInput1.imaginary),20,20)
      }else{
        ellipse(global2StageX(this.myOutput.real),global2StageY(this.myOutput.imaginary),20,20)
      }     

    }

  }

}










