myLevels[0] = {
	cartesian: true,
	instructions: "Place an adder on the board",
	explanation: "This is a cartesian adder, with one input moves on the horizontal axis, and the other moves on the veritcal axis...",
	testComplete: function(){
		return (myOperators.length==1
			&&myOperators[0].type===ADDER);
	}
};

myLevels[1] = {
	cartesian: true,
	instructions: "Slide the adder open to form a rectangle.",
	testComplete: function(){
		return (myOperators.length==1
			&&myOperators[0].type===ADDER
			&&myOperators[0].myInput1.real!=0
			&&myOperators[0].myInput2.imaginary!=0);
	}
};

myLevels[2] = {
	cartesian: true,
	DRO: true,
	instructions: "Move the blue dot to the green dot.",

	targetDot: true,

	outputTargetX: -4,
	outputTargetY: 6,

	testComplete: function(){
		if(myOperators.length==1){

			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<5);

			return outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[3] = {
	cartesian: true,
	DRO: true,
	instructions: "Move the blue dot to the green dot.",

	targetDot: true,

	outputTargetX: 8,
	outputTargetY: -2,

	testComplete: function(){
		if(myOperators.length==1){

			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<5);

			return outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[4] = {
	DRO: true,
	instructions: "We can turn off the cartesian coordinates constraint.\nFind\n (4,-3i) + (-12,-4i)",
	inputTarget1X: 4,
	inputTarget1Y: -3,
	inputTarget2X: -12,
	inputTarget2Y: -4,
	outputTargetX: -8,
	outputTargetY: -7,
	testComplete: function(){
		if(myOperators.length==1){

			let inputComplete = (dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget1X),axisToPixelY(this.inputTarget1Y))<15)||
								(dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget2X),axisToPixelY(this.inputTarget2Y))<15);
			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<15);

			return inputComplete&&outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[5] = {
	instructions: "Clear the board",
	testComplete: function(){
		return (myOperators.length==0);
	}
};

myLevels[6] = {
	polar: true,
	instructions: "Now place a multiplier on the board",
	explanation: "This is a polar coordinates multiplier, with one input stuck on the positive horizontal axis, and the other stuck on the unit circle...",
	testComplete: function(){
		return (myOperators.length==1
			&&myOperators[0].type===MULTIPLIER);
	}
};

myLevels[7] = {
	polar: true,
	instructions: "Open up the multiplier...",
	testComplete: function(){
		return (myOperators.length==1
			&&myOperators[0].type===MULTIPLIER
			&&myOperators[0].myInput1.real!=1
			&&myOperators[0].myInput2.imaginary!=0);
	}
};

myLevels[8] = {
	polar: true,
	DRO: true,
	instructions: "Move the red dot to the green dot.",

	targetDot: true,

	outputTargetX: 3,
	outputTargetY: 2,

	testComplete: function(){
		if(myOperators.length==1){

			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<5);

			return outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[9] = {
	polar: true,
	DRO: true,
	instructions: "Move the red dot to the green dot.",

	targetDot: true,

	outputTargetX: -5,
	outputTargetY: -5,

	testComplete: function(){
		if(myOperators.length==1){

			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<5);

			return outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[10] = {
	polar: true,
	instructions: "Clear the board",
	testComplete: function(){
		return (myOperators.length==0);
	}
};