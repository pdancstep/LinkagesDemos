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

var outputProdX = 0
var outputProdY = 0

var outputSumX = 0
var outputSumY = 0

var a
var b
var c
var d


function draw() {
	background(indicator)

	noFill()
	stroke(200)
	strokeWeight(1)
	line(0,height/2,width,height/2)
	line(width/2,0,width/2,height)
	ellipse(width/2,height/2,100,100)



	if(dragging1){
		input1X = mouseX
		input1Y = mouseY
	}

	if(dragging2){
		input2X = mouseX
		input2Y = mouseY
	}

	a = input1X - width/2
	b = input1Y - height/2
	c = input2X - width/2
	d = input2Y - height/2

	outputProdX = ((a*c)-(b*d))/50
	outputProdY = ((a*d)+(b*c))/50

	outputSumX = (a+c)
	outputSumY = (b+d)


	noFill()

	stroke(30,200,225)
	strokeWeight(4)

	beginShape()
		vertex(width/2,height/2)
		vertex(input1X, input1Y)
		vertex(width/2+outputSumX,height/2+outputSumY)
		vertex(input2X,input2Y)
	endShape(CLOSE)

	stroke(255,100,0)
	strokeWeight(2)
	line(width/2,height/2,input1X,input1Y)
	line(width/2,height/2,input2X,input2Y)
	line(width/2,height/2,width/2+outputProdX,height/2+outputProdY)

	






	fill(255)
	ellipse(input1X,input1Y,15,15)
	ellipse(input2X,input2Y,15,15)
	fill(30,200,255)
	noStroke()
	ellipse(width/2+outputSumX,height/2+outputSumY,15,15)
	fill(255,0,0)
	ellipse(width/2+outputProdX,height/2+outputProdY,15,15)

	noFill()
	stroke(255,200)
	strokeWeight(3)
	ellipse(input1X,input1Y,20,20)
	ellipse(input2X,input2Y,20,20)

	fill(150)
	noStroke()
	for(i=-15;i<16;i++){
		text(i,width/2+i*50,height/2-16)
		text(-i+"i",width/2-20,height/2+i*50)
		ellipse(width/2+i*50,height/2,5,5)
		ellipse(width/2,height/2+i*50,5,5)
	}


}


function touchStarted() {
	if(dist(mouseX,mouseY,input1X,input1Y)<25){
		dragging1 = true
	}else if(dist(mouseX,mouseY,input2X,input2Y)<25){
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