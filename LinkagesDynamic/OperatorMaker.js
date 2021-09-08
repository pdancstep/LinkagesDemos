//type 0 is adder
//type 1 is multiplier


function MakeOperator(type) {


  if(type==0){

    this.myInput1 = new MakeNumber(0,0,true)
    this.myInput2 = new MakeNumber(0,0,true)

    this.myOutput = new MakeNumber(0,0,false)
  
  }else if(type==1){

    this.myInput1 = new MakeNumber(50,0,true)
    this.myInput2 = new MakeNumber(50,0,true)

    this.myOutput = new MakeNumber(50,0,false)

  }

  //mode booleans for backdriving input 1 and input 2
  this.reverseMode1 = false
  this.reverseMode2 = false

  //boolean that reports if one of it's inputs is being dragged
  this.dragging = false

  //boolean marking that this operator is in the process of being reversed
  this.beingReversed = false


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
    //give drag priority to input 1
    if(!this.myInput1.dragging){
      this.myInput2.clickMe()
    }
    this.myOutput.clickMe()

    if(this.myInput1.dragging||this.myInput2.dragging||this.myOutput.dragging){
      this.dragging = true
    }


  }


  this.allFalse = function(){
    this.myInput1.dragging = false
    this.myInput2.dragging = false
    this.myOutput.dragging = false

    this.dragging = false
  }





  //double click on nodes to control dependencies...
  this.reverseOperator = function(){


    //Mode changes for uncollapsed adder...
    //Right now activates mode-switch chooser, and reversals are handled by a function at the sketch level...
    if(!this.collapsed){


      if(this.myInput1.over&&!this.myInput1.free&&!this.myInput1.inStack){

        //top level reversal boolean
        reversingOperator = true
        //local reversal boolean
        this.beingReversed = true

        freeNodeSearch(this.myInput2)
        freeNodeSearch(this.myOutput)

      }

      if(this.myInput2.over&&!this.myInput2.free&&!this.myInput2.inStack){

        //top level reversal boolean
        reversingOperator = true
        //local reversal boolean
        this.beingReversed = true

        freeNodeSearch(this.myInput1)
        freeNodeSearch(this.myOutput)

      }

      
      if(this.myOutput.over&&!this.myOutput.free&&!this.myOutput.inStack){

        //top level reversal boolean
        reversingOperator = true
        //local reversal boolean
        this.beingReversed = true

        freeNodeSearch(this.myInput1)
        freeNodeSearch(this.myInput2)

      }



    //mode changes for collapsed adder (which are automatic, so don't need the sketch level function...)
    }else{

      //double click on input1
      if(this.myInput1.over&&!this.myInput1.free){

        //make input1 dependent
        this.myInput1.free = true

        //free up the output node...
        this.myOutput.free = false

        //change to appropriate dependency mode
        this.reverseCollapsed = false

      }

      //double click on output
      if(this.myOutput.over&&!this.myOutput.free){

        //make output dependent
        this.myOutput.free = true
        //free up input 1
        this.myInput1.free = false

        //change to appropriate dependency mode
        this.reverseCollapsed = true

      }
    }
  }

  this.update = function(){

    //check if this operator is being collapsed via press-and-hold...
    if(this.myInput1.over&&this.myInput2.over){
      if(pressAndHold){
        if((millis()-timerStart)>holdLength){
          indicatorFlash = true
          pressAndHold = false
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
      if(type==0){
        this.propagateOutputSum()
      }else if(type==1){
        this.propagateOutputProd()
      }
    }


  }



  //compares nearby points to see if its profitable to move in a given direction, and determines the appropriate shift...
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


  this.propagateOutputSum = function(){
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

        leftX = (this.myInput2.real-searchSize)-(this.myOutput.real-this.myInput1.real)
        rightX = (this.myInput2.real+searchSize)-(this.myOutput.real-this.myInput1.real)
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

  this.propagateOutputProd = function(){
    //assume no shifting
    shiftX=0
    shiftY=0


    //for uncollapsed operator
    if(!this.collapsed){


      if(!this.reverseMode1&&!this.reverseMode2){

        //check whether moving left or right gives a better fit to constraints...
        leftX = (this.myOutput.real-searchSize)-((this.myInput1.real*this.myInput2.real)-(this.myInput1.imaginary*this.myInput2.imaginary))/50
        rightX = (this.myOutput.real+searchSize)-((this.myInput1.real*this.myInput2.real)-(this.myInput1.imaginary*this.myInput2.imaginary))/50

        //...same for up or down movement...
        upperY = (this.myOutput.imaginary+searchSize)-((this.myInput1.real*this.myInput2.imaginary)+(this.myInput1.imaginary*this.myInput2.real))/50
        lowerY = (this.myOutput.imaginary-searchSize)-((this.myInput1.real*this.myInput2.imaginary)+(this.myInput1.imaginary*this.myInput2.real))/50

        //decide whether/where to shift ouput position...
        this.compareShifts()
        this.myOutput.real = this.myOutput.real+shiftX
        this.myOutput.imaginary = this.myOutput.imaginary+shiftY

      
      }else if(this.reverseMode1){

        denominator = ((this.myInput2.real*this.myInput2.real)+(this.myInput2.imaginary*this.myInput2.imaginary))/50

        leftX = (this.myInput1.real-searchSize)-(((this.myOutput.real*this.myInput2.real)+(this.myOutput.imaginary*this.myInput2.imaginary))/denominator)
        rightX = (this.myInput1.real+searchSize)-(((this.myOutput.real*this.myInput2.real)+(this.myOutput.imaginary*this.myInput2.imaginary))/denominator)
        upperY = (this.myInput1.imaginary+searchSize)-(((this.myOutput.imaginary*this.myInput2.real)-(this.myOutput.real*this.myInput2.imaginary))/denominator)
        lowerY = (this.myInput1.imaginary-searchSize)-(((this.myOutput.imaginary*this.myInput2.real)-(this.myOutput.real*this.myInput2.imaginary))/denominator)

        this.compareShifts()
        this.myInput1.real = this.myInput1.real+shiftX
        this.myInput1.imaginary = this.myInput1.imaginary+shiftY


      }else if(this.reverseMode2){

        denominator = ((this.myInput1.real*this.myInput1.real)+(this.myInput1.imaginary*this.myInput1.imaginary))/50

        leftX = (this.myInput2.real-searchSize)-(((this.myOutput.real*this.myInput1.real)+(this.myOutput.imaginary*this.myInput1.imaginary))/denominator)
        rightX = (this.myInput2.real+searchSize)-(((this.myOutput.real*this.myInput1.real)+(this.myOutput.imaginary*this.myInput1.imaginary))/denominator)
        upperY = (this.myInput2.imaginary+searchSize)-(((this.myOutput.imaginary*this.myInput1.real)-(this.myOutput.real*this.myInput1.imaginary))/denominator)
        lowerY = (this.myInput2.imaginary-searchSize)-(((this.myOutput.imaginary*this.myInput1.real)-(this.myOutput.real*this.myInput1.imaginary))/denominator)

        this.compareShifts()
        this.myInput2.real = this.myInput2.real+shiftX
        this.myInput2.imaginary = this.myInput2.imaginary+shiftY

      }


    //for collapsed operator
    }else{


      if(!this.reverseCollapsed){

        leftX = (this.myOutput.real-searchSize)-(this.myInput1.real*this.myInput1.real-this.myInput1.imaginary*this.myInput1.imaginary)/50
        rightX = (this.myOutput.real+searchSize)-(this.myInput1.real*this.myInput1.real-this.myInput1.imaginary*this.myInput1.imaginary)/50
        upperY = (this.myOutput.imaginary+searchSize)-(2*this.myInput1.real*this.myInput1.imaginary)/50
        lowerY = (this.myOutput.imaginary-searchSize)-(2*this.myInput1.real*this.myInput1.imaginary)/50

        this.compareShifts()
        this.myOutput.real = this.myOutput.real+shiftX
        this.myOutput.imaginary = this.myOutput.imaginary+shiftY

      }else{


        //NOTE: unlike the above searches, where we just ignore input2, in this case we start each iteration by moving the "invisible" input2 to towards input1, and then use that position to update input1 
        this.myInput2.real += (this.myInput1.real-this.myInput2.real)*.4
        this.myInput2.imaginary += (this.myInput1.imaginary-this.myInput2.imaginary)*.4

        denominator = ((this.myInput2.real*this.myInput2.real)+(this.myInput2.imaginary*this.myInput2.imaginary))/50

        leftX = (this.myInput1.real-searchSize)-(((this.myOutput.real*this.myInput2.real)+(this.myOutput.imaginary*this.myInput2.imaginary))/denominator)
        rightX = (this.myInput1.real+searchSize)-(((this.myOutput.real*this.myInput2.real)+(this.myOutput.imaginary*this.myInput2.imaginary))/denominator)
        upperY = (this.myInput1.imaginary+searchSize)-(((this.myOutput.imaginary*this.myInput2.real)-(this.myOutput.real*this.myInput2.imaginary))/denominator)
        lowerY = (this.myInput1.imaginary-searchSize)-(((this.myOutput.imaginary*this.myInput2.real)-(this.myOutput.real*this.myInput2.imaginary))/denominator)


        this.compareShifts()
        this.myInput1.real = this.myInput1.real+shiftX
        this.myInput1.imaginary = this.myInput1.imaginary+shiftY

      }

    }

  }



  this.display = function(){
    
    //display for uncollapsed operator...
    if(!this.collapsed){


      if(type==0){      

        //parallelogram      
        noFill()
        stroke(30,200,225)
        strokeWeight(1)
        beginShape()
          vertex(width/2,height/2)
          vertex(global2StageX(this.myInput1.real), global2StageY(this.myInput1.imaginary))
          vertex(global2StageX(this.myOutput.real), global2StageY(this.myOutput.imaginary))
          vertex(global2StageX(this.myInput2.real), global2StageY(this.myInput2.imaginary))
        endShape(CLOSE)
        
        //nodes
        fill(200,255,255)
        this.myInput1.display()
        fill(200,255,255)
        this.myInput2.display()
        fill(30,200,255)
        this.myOutput.display()
      
      }else if(type==1){
        

        //lines
        noFill()
        strokeWeight(1)
        stroke(255,0,0)
        line(width/2,height/2,global2StageX(this.myOutput.real),global2StageY(this.myOutput.imaginary))
        stroke(255,100,0)
        line(width/2,height/2,global2StageX(this.myInput1.real),global2StageY(this.myInput1.imaginary))
        line(width/2,height/2,global2StageX(this.myInput2.real),global2StageY(this.myInput2.imaginary))

        
        //nodes
        noStroke()        
        fill(255,0,0)
        this.myOutput.display()
        fill(255,100,0)
        this.myInput1.display()
        fill(255,100,0)
        this.myInput2.display()

      }


    //display for collapsed operator...
    }else{

      if(type==0){

        noFill()
        stroke(30,200,225)
        strokeWeight(1)

        //line...
        line(width/2,height/2,global2StageX(this.myOutput.real), global2StageY(this.myOutput.imaginary))

        //nodes

        fill(200,255,200)
        this.myInput1.display()
        fill(30,200,255)
        this.myOutput.display()

      }else if(type==1){

        //lines...
        noFill()
        stroke(255,0,0)
        strokeWeight(1)
        line(width/2,height/2,global2StageX(this.myOutput.real), global2StageY(this.myOutput.imaginary))
        stroke(255,100,0)
        line(width/2,height/2,global2StageX(this.myInput1.real), global2StageY(this.myInput1.imaginary))

        //nodes

        noStroke()
        fill(255,200,0)
        this.myInput1.display()
        fill(255,0,0)
        this.myOutput.display()


      }     

    }

  }


  //maybe defining this at the level of the number?
  this.freeNodeDisplay = function(){

    noStroke()

    if(this.myInput1.free){
      if(type==0){
        fill(200,255,255)
      }else{
        fill(255,100,0)
      }
      ellipse(global2StageX(this.myInput1.real),global2StageY(this.myInput1.imaginary),15,15)
    }
    if(this.myInput2.free){
      if(type==0){
        fill(200,255,255)
      }else{
        fill(255,100,0)
      }
      ellipse(global2StageX(this.myInput2.real),global2StageY(this.myInput2.imaginary),15,15)
    }
    if(this.myOutput.free){
      if(type==0){
        fill(30,200,255)
      }else{
        fill(255,0,0)
      }
      ellipse(global2StageX(this.myOutput.real),global2StageY(this.myOutput.imaginary),15,15)
    }

  }




}










