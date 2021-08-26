function setup() {
  createCanvas(1400,800)
  textAlign(CENTER,CENTER)
}


var indicator = 50

var input1X = 820
var input1Y = 380

var dragging1 = false


var input2X = 760
var input2Y = 280

var dragging2 = false

var outputProdX = 4
var outputProdY = 2

var outputSumX = 3
var outputSumY = 1


var discriminantX
var discriminantY

var root1X
var root1Y
var root2X
var root2Y



function draw() {
	background(indicator)

	noFill()
	stroke(200)
	strokeWeight(1)
	line(0,height/2,width,height/2)
	line(width/2,0,width/2,height)
	ellipse(width/2,height/2,100,100)



	if(dragging1){
		outputSumX = (mouseX - width/2)/50
		outputSumY = (mouseY - height/2)/50
	}

	if(dragging2){
		outputProdX = (mouseX - width/2)/50
		outputProdY = (mouseY - height/2)/50
	}


	discriminantX = ((outputSumX*outputSumX)-(outputSumY*outputSumY)-4*outputProdX)
	discriminantY = (2*outputSumX*outputSumY-4*outputProdY)

	findRoots(discriminantX,discriminantY)





	noFill()

	stroke(30,200,225)
	strokeWeight(4)

	beginShape()
		vertex(width/2,height/2)
		vertex(width/2+50*root1X,height/2+50*root1Y)
		vertex(width/2+50*outputSumX,height/2+50*outputSumY)
		vertex(width/2+50*root2X,height/2+50*root2Y)
	endShape(CLOSE)

	stroke(255,100,0)
	strokeWeight(2)
	line(width/2,height/2,width/2+50*root1X,height/2+50*root1Y)
	line(width/2,height/2,width/2+50*root2X,height/2+50*root2Y)
	line(width/2,height/2,width/2+50*outputProdX,height/2+50*outputProdY)

	






	fill(255)
	ellipse(width/2+50*root1X,height/2+50*root1Y,15,15)
	ellipse(width/2+50*root2X,height/2+50*root2Y,15,15)
	fill(30,200,255)
	noStroke()
	ellipse(width/2+50*outputSumX,height/2+50*outputSumY,15,15)
	fill(255,0,0)
	ellipse(width/2+50*outputProdX,height/2+50*outputProdY,15,15)

	noFill()
	stroke(255,200)
	strokeWeight(3)
	ellipse(width/2+50*outputSumX,height/2+50*outputSumY,20,20)
	ellipse(width/2+50*outputProdX,height/2+50*outputProdY,20,20)

	fill(150)
	noStroke()
	for(i=-15;i<16;i++){
		text(i,width/2+i*50,height/2-16)
		text(-i+"i",width/2-20,height/2+i*50)
		ellipse(width/2+i*50,height/2,5,5)
		ellipse(width/2,height/2+i*50,5,5)
	}







}

var radius
var theta

function findRoots(xComp,yComp){
	theta = atan2(yComp,xComp)
	radius = sqrt((xComp*xComp)+(yComp*yComp))

	root1X = (outputSumX + sqrt(radius)*cos(theta/2))/2
	root1Y = (outputSumY + sqrt(radius)*sin(theta/2))/2
	root2X = (outputSumX + sqrt(radius)*cos(PI+theta/2))/2
	root2Y = (outputSumY + sqrt(radius)*sin(PI+theta/2))/2
}


function touchStarted() {
	if(dist(mouseX,mouseY,width/2+50*outputSumX,height/2+50*outputSumY)<25){
		dragging1 = true
	}else if(dist(mouseX,mouseY,width/2+50*outputProdX,height/2+50*outputProdY)<25){
		dragging2 = true
	}
}

function touchMoved() {
	return false
}

function touchEnded(){
	dragging1 = false
	dragging2 = false
}