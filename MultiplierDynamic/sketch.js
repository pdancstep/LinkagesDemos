var myOperators = []


function setup() {
  createCanvas(1400,800)
  textAlign(CENTER,CENTER)


  myOperators.push(new MakeOperator(1))

}


var indicator = 50




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











