var myOperators = []


function setup() {
  createCanvas(1400,800)
  textAlign(CENTER,CENTER)

  myOperators.push(new MakeOperator())

}


var indicator = 50

var input1X = 100
var input1Y = 200

var dragging1 = false


var input2X = 200
var input2Y = 100

var dragging2 = false

var outputX = 400
var outputY = 400

var dragging3 = false


//amount to "shift" dependent variable towards better position
var shiftX = 0
var shiftY = 0

//Four directions to check for better position.
var upperY
var lowerY
var leftX
var rightX

//how far to look in each direction
var searchSize = 5

//how many iterations to run before updating
var iterations = 100

//booleans for forward/reverse kinematics, based on which input is made dependent...
var reverseMode1 = false
var reverseMode2 = false

//double tap reference (sketch level)
var tappedOnce = false
var currentTime
var doubleTapTimer = 300

//press and hold references
var pressAndHold = false
var timerStart 
var holdLength = 700



function draw() {


	if(tappedOnce){
    if((millis()-currentTime)>doubleTapTimer){
      tappedOnce=false
    }
  }

	background(indicator)

	//background
	noFill()
	stroke(200)
	strokeWeight(1)
	line(0,height/2,width,height/2)
	line(width/2,0,width/2,height)
	ellipse(width/2,height/2,100,100)


	//update inputs
	if(dragging1){
		input1X = stage2GlobalX(mouseX)
		input1Y = stage2GlobalY(mouseY)
	}

	if(dragging2){
		input2X = stage2GlobalX(mouseX)
		input2Y = stage2GlobalY(mouseY)
	}

	if(dragging3){
		outputX = stage2GlobalX(mouseX)
		outputY = stage2GlobalY(mouseY)
	}


	myOperators[0].overMe()
	myOperators[0].update()
	myOperators[0].display()


	//number data
	fill(150)
	noStroke()
	for(i=-15;i<16;i++){
		text(i,width/2+i*50,height/2-16)
		text(-i+"i",width/2-20,height/2+i*50)
		ellipse(width/2+i*50,height/2,5,5)
		ellipse(width/2,height/2+i*50,5,5)
	}



	//DEBUG
	fill(200)
	//text(myOperators[0].reverseCollapsed,100,100)
	//text(myOperators[0].myOutput.free,100,130)

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


function propagateSum(){
	//assume no shifting
	shiftX=0
	shiftY=0

	//check whether moving left or right gives a better fit to constraints...
	leftX = (outputX-searchSize)-(input1X+input2X)
	rightX = (outputX+searchSize)-(input1X+input2X)

	if(abs(leftX)<abs(rightX)){
		shiftX = shiftX - 1
	}else if(abs(leftX)>abs(rightX)){
		shiftX = shiftX + 1
	}

	//...same for up or down movement...
	upperY = (outputY+searchSize)-(input1Y+input2Y)
	lowerY = (outputY-searchSize)-(input1Y+input2Y)

	if(abs(upperY)<abs(lowerY)){
		shiftY = shiftY + 1
	}else if(abs(upperY)>abs(lowerY)){
		shiftY = shiftY - 1
	}

	outputX = outputX+shiftX
	outputY = outputY+shiftY
}


function propagateDifference1(){
	//assume no shifting
	shiftX=0
	shiftY=0

	//check whether moving left or right gives a better fit to constraints...
	leftX = (input1X-searchSize)-(outputX-input2X)
	rightX = (input1X+searchSize)-(outputX-input2X)

	if(abs(leftX)<abs(rightX)){
		shiftX = shiftX - 1
	}else if(abs(leftX)>abs(rightX)){
		shiftX = shiftX + 1
	}

	//...same for up or down movement...
	upperY = (input1Y+searchSize)-(outputY-input2Y)
	lowerY = (input1Y-searchSize)-(outputY-input2Y)

	if(abs(upperY)<abs(lowerY)){
		shiftY = shiftY + 1
	}else if(abs(upperY)>abs(lowerY)){
		shiftY = shiftY - 1
	}

	input1X = input1X+shiftX
	input1Y = input1Y+shiftY
}

function propagateDifference2(){
	//assume no shifting
	shiftX=0
	shiftY=0

	//check whether moving left or right gives a better fit to constraints...
	leftX = (input2X-searchSize)-(outputX-input1X)
	rightX = (input2X+searchSize)-(outputX-input1X)

	if(abs(leftX)<abs(rightX)){
		shiftX = shiftX - 1
	}else if(abs(leftX)>abs(rightX)){
		shiftX = shiftX + 1
	}

	//...same for up or down movement...
	upperY = (input2Y+searchSize)-(outputY-input1Y)
	lowerY = (input2Y-searchSize)-(outputY-input1Y)

	if(abs(upperY)<abs(lowerY)){
		shiftY = shiftY + 1
	}else if(abs(upperY)>abs(lowerY)){
		shiftY = shiftY - 1
	}

	input2X = input2X+shiftX
	input2Y = input2Y+shiftY
}


function touchStarted() {

	pressAndHold = true
	timerStart = millis()

	if(!tappedOnce){
		tappedOnce = true
		currentTime = millis()
	}else{
		//check if operator should change kinematic direction...
		myOperators[0].modeChange()
		tappedOnce = false
	}

	myOperators[0].clickMe()

}



function touchMoved() {
	pressAndHold = false
	return false
}

function touchEnded(){
	pressAndHold = false
	myOperators[0].allFalse()
}











