myLevels[0] = {
    cartesian: true,
    instructions: "Place an adder on the board",
    explanation: "This is a 'cartesian coordinates' adder, with one input stuck on the horizontal axis, and the other stuck on the veritcal axis...",
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
    instructions: "Position the blue dot on the green dot.",
    
    targetDot: true,
    
    outputTargetX: -4,
    outputTargetY: 6,
    
    testComplete: function() {
	return (myOperators.length==1 &&
		myOperators[0].myOutput.isWithinPx(this.outputTargetX,
						   this.outputTargetY,
						   5));
    }
};

myLevels[3] = {
    cartesian: true,
    DRO: true,
    instructions: "Position the blue dot on the green dot.",
    
    targetDot: true,
    
    outputTargetX: 8,
    outputTargetY: -2,
    
    testComplete: function() {
	return (myOperators.length==1 &&
		myOperators[0].myOutput.isWithinPx(this.outputTargetX,
						   this.outputTargetY,
						   5));
    }
};

myLevels[4] = {
    DRO: true,
    instructions: "If we turn off the cartesian coordinates constraint, we get a normal adder.\nFind\n (4,-3i) + (-12,-4i)",
    inputTarget1X: 4,
    inputTarget1Y: -3,
    inputTarget2X: -12,
    inputTarget2Y: -4,
    outputTargetX: -8,
    outputTargetY: -7,
    testComplete: function(){
	return (myOperators.length==1 &&
		(myOperators[0].myInput1.isWithinPx(this.inputTarget1X,
						    this.inputTarget1Y,
						    15)
		 ||
		 myOperators[0].myInput1.isWithinPx(this.inputTarget2X,
						    this.inputTarget2Y,
						    15))
		&& myOperators[0].myOutput.isWithinPx(this.outputTargetX,
						      this.outputTargetY,
						      15));
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
    explanation: "This is a 'polar coordinates' multiplier, with one input stuck on the positive horizontal axis, and the other stuck on the unit circle...",
    testComplete: function(){
	return (myOperators.length==1
		&& myOperators[0].type===MULTIPLIER);
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
    instructions: "Postion the red dot on the green dot.",
    
    targetDot: true,
    
    outputTargetX: 3,
    outputTargetY: 2,
    
    testComplete: function(){
	return (myOperators.length==1 &&
		myOperators[0].myOutput.isWithinPx(this.outputTargetX,
						   this.outputTargetY,
						   5));
    }
};

myLevels[9] = {
	polar: true,
	DRO: true,
	instructions: "Position the red dot on the green dot.",

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


myLevels[11] = {
    overlay: true,
    instructions: "Place an adder on the board and unpack it",
    explanation: "The blue overlay graphic shows how the corner and tip of the parallelogram SLIDE together.",
    testComplete: function(){
	return (myOperators.length==1
		&&myOperators[0].type===ADDER
		&&myOperators[0].myInput1.real!=0
		&&myOperators[0].myInput2.imaginary!=0);
    }
};

myLevels[12] = {
	DRO: true,
	overlay:true,
	instructions: "Find\n (1,3i)+(3,2i).",

	inputTarget1X: 1,
	inputTarget1Y: 3,
	inputTarget2X: 3,
	inputTarget2Y: 2,
	outputTargetX: 4,
	outputTargetY: 5,
	testComplete: function(){
		if(myOperators.length==1){

			let inputComplete = (dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget1X),axisToPixelY(this.inputTarget1Y))<5)||
								(dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget2X),axisToPixelY(this.inputTarget2Y))<5);
			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<5);

			return inputComplete&&outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[13] = {
	tracers: true,
	instructions: "Now move the adder around to see tracers...",
	explanation: "Try making a doubler, and a halver!",
	testComplete: function(){
		return true;
	}
};


myLevels[14] = {
	instructions: "Clear the board",
	testComplete: function(){
		return (myOperators.length==0);
	}
};


myLevels[15] = {
    overlay: true,
    instructions: "Place a multiplier on the board and unpack it",
    explanation: "The orange overlay graphic shows how the point of the multiplier SCALE and ROTATE together.",
    testComplete: function(){
	return (myOperators.length==1
		&&myOperators[0].type===MULTIPLIER
		&&myOperators[0].myInput1.real!=1
		&&myOperators[0].myInput2.real!=1);
    }
};







myLevels[16] = {
	overlay:true,
	DRO: true,
	instructions: "Find\n 2*(2,2i).",

	inputTarget1X: 2,
	inputTarget1Y: 0,
	inputTarget2X: 2,
	inputTarget2Y: 2,
	outputTargetX: 4,
	outputTargetY: 4,
	testComplete: function(){
		if(myOperators.length==1){

			let inputComplete = (dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget1X),axisToPixelY(this.inputTarget1Y))<5)||
								(dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget2X),axisToPixelY(this.inputTarget2Y))<5);
			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<5);

			return inputComplete&&outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[17] = {
	tracers: true,
	instructions: "Now move the adder around to see tracers...",
	explanation: "Try making a squarer, and a square rooter!",
	testComplete: function(){
		return true;
	}
};
