myLevels[0] = {
	DRO: false,
	instructions: "Place a multiplier on the board and unpack it.",
	explanation: "You'll now be asked to place this multiplier in various positions...",
	testComplete: function(){
		return (myOperators.length==1
			&&myOperators[0].type===MULTIPLIER
			&&myOperators[0].myInput1.imaginary!=0
			&&myOperators[0].myInput2.imaginary!=0);
	}
};

myLevels[1] = {
	DRO: true,
	instructions: "Find\n 2 x 3",


	inputTarget1X: 2,
	inputTarget1Y: 0,
	inputTarget2X: 3,
	inputTarget2Y: 0,
	outputTargetX: 6,
	outputTargetY: 0,

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

myLevels[2] = {
	DRO: true,

	instructions: "Find\n 3 x 4",
	explanation: false,

	inputTarget1X: 3,
	inputTarget1Y: 0,
	inputTarget2X: 4,
	inputTarget2Y: 0,
	outputTargetX: 12,
	outputTargetY: 0,
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

myLevels[3] = {
	DRO: true,

	instructions: "Find\n 9 x 1",
	explanation: "Anything times 1 is always equal to itself.",

	inputTarget1X: 9,
	inputTarget1Y: 0,
	inputTarget2X: 1,
	inputTarget2Y: 0,
	outputTargetX: 9,
	outputTargetY: 0,
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

myLevels[4] = {
	DRO: true,

	instructions: "Find\n 9 x 0",
	explanation:  "Anything times 0 is always equal to 0.",

	inputTarget1X: 9,
	inputTarget1Y: 0,
	inputTarget2X: 0,
	inputTarget2Y: 0,
	outputTargetX: 0,
	outputTargetY: 0,
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
	DRO: true,

	instructions: "Find\n 6 x 2",
	inputTarget1X: 6,
	inputTarget1Y: 0,
	inputTarget2X: 2,
	inputTarget2Y: 0,
	outputTargetX: 12,
	outputTargetY: 0,
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


myLevels[6] = {
	instructions: "Take the input on 6 and move it to (3,3i)",
	explanation: "Notice how this is another kind of doubler",
	testComplete: function(){
		return (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(6),axisToPixelY(6))<15)
	}
};


myLevels[7] = {
	DRO: true,
	instructions: "Find\n double 2i",
	inputTarget1X: 0,
	inputTarget1Y: 2,
	inputTarget2X: 2,
	inputTarget2Y: 0,
	outputTargetX: 0,
	outputTargetY: 4,
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

myLevels[8] = {
	DRO: true,
	instructions: "Find\n double (-6)",
	inputTarget1X: -6,
	inputTarget1Y: 0,
	inputTarget2X: 2,
	inputTarget2Y: 0,
	outputTargetX: -12,
	outputTargetY: 0,
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

myLevels[9] = {
	DRO: true,
	instructions: "Find\n double (-4i)",
	inputTarget1X: 0,
	inputTarget1Y: -4,
	inputTarget2X: 2,
	inputTarget2Y: 0,
	outputTargetX: 0,
	outputTargetY: -8,
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

myLevels[10] = {
	DRO: true,
	instructions: "Find\n double (2,2i)",

	inputTarget1X: 2,
	inputTarget1Y: 2,
	inputTarget2X: 2,
	inputTarget2Y: 0,
	outputTargetX: 4,
	outputTargetY: 4,
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


myLevels[11] = {
	instructions: "Take the input on 2 and move it to 3",
	explanation: "Notice how our doubler has grown into a tripler!",
	testComplete: function(){
		return (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(6),axisToPixelY(6))<15)
	}
};

myLevels[12] = {
	DRO: true,
	instructions: "Find\n triple 4",

	inputTarget1X: 4,
	inputTarget1Y: 0,
	inputTarget2X: 3,
	inputTarget2Y: 0,
	outputTargetX: 12,
	outputTargetY: 0,
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

myLevels[13] = {
	DRO: true,
	instructions: "Find\n triple 2i",

	inputTarget1X: 0,
	inputTarget1Y: 2,
	inputTarget2X: 3,
	inputTarget2Y: 0,
	outputTargetX: 0,
	outputTargetY: 6,
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

myLevels[14] = {
	DRO: true,
	instructions: "Find\n triple (-3)",

	inputTarget1X: -3,
	inputTarget1Y: 0,
	inputTarget2X: 3,
	inputTarget2Y: 0,
	outputTargetX: -9,
	outputTargetY: 0,
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

myLevels[15] = {
	DRO: true,
	instructions: "Find\n triple (-i)",

	inputTarget1X: 0,
	inputTarget1Y: -1,
	inputTarget2X: 3,
	inputTarget2Y: 0,
	outputTargetX: 0,
	outputTargetY: -3,
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

myLevels[16] = {
	DRO: true,
	instructions: "Find\n 4 x 2i",

	inputTarget1X: 0,
	inputTarget1Y: 2,
	inputTarget2X: 4,
	inputTarget2Y: 0,
	outputTargetX: 0,
	outputTargetY: 8,
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


myLevels[17] = {
	DRO: true,
	instructions: "Find\n 2 x 2i",

	inputTarget1X: 2,
	inputTarget1Y: 0,
	inputTarget2X: 0,
	inputTarget2Y: 2,
	outputTargetX: 0,
	outputTargetY: 4,
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


myLevels[18] = {
	instructions: "Take the input on 2 and move it to i",
	testComplete: function(){
		return (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(-2),axisToPixelY(0))<15)
	}
};

myLevels[19] = {
	DRO: true,
	instructions: "Find\n i x i",
	explanation: "Note that i x i = (-1) is the DEFINTION of i.",

	inputTarget1X: 0,
	inputTarget1Y: 1,
	inputTarget2X: 0,
	inputTarget2Y: 1,
	outputTargetX: -1,
	outputTargetY: 0,
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

myLevels[20] = {
	DRO: true,
	instructions: "Find\n 2i x 3i",

	inputTarget1X: 0,
	inputTarget1Y: 2,
	inputTarget2X: 0,
	inputTarget2Y: 3,
	outputTargetX: -6,
	outputTargetY: 0,
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


myLevels[21] = {
	DRO: true,
	instructions: "Find\n (-3) x (-2)",
	explanation: "The multiplier's rotation automatically makes a negative times a negative into a positive.",

	inputTarget1X: -3,
	inputTarget1Y: 0,
	inputTarget2X: -2,
	inputTarget2Y: 0,
	outputTargetX: 6,
	outputTargetY: 0,
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


myLevels[22] = {
	DRO: true,
	instructions: "Find\n (2,i) x (3,2i)",

	inputTarget1X: 2,
	inputTarget1Y: 1,
	inputTarget2X: 3,
	inputTarget2Y: 2,
	outputTargetX: 4,
	outputTargetY: 7,
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

myLevels[23] = {
	DRO: true,
	instructions: "Find\n (2,2i) x (2,2i)",
	explanation: "***Explain how doubling the angle and squaring the length gives 8.",

	inputTarget1X: 2,
	inputTarget1Y: 2,
	inputTarget2X: 2,
	inputTarget2Y: 2,
	outputTargetX: 0,
	outputTargetY: 8,
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

myLevels[24] = {
	DRO: true,
	instructions: "Find\n (4,i) x (-1,i)",

	inputTarget1X: 4,
	inputTarget1Y: 1,
	inputTarget2X: -1,
	inputTarget2Y: 1,
	outputTargetX: -5,
	outputTargetY: 3,
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

myLevels[25] = {
	DRO: true,
	instructions: "Find\n (1,-2i) x (1,-4i)",
	explanation: "End of Section 2.",

	inputTarget1X: 1,
	inputTarget1Y: -2,
	inputTarget2X: 1,
	inputTarget2Y: -4,
	outputTargetX: -7,
	outputTargetY: -6,
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
























