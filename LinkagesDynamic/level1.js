myLevels[0] = {
	instructions: "Place an adder on the board and unpack it",
	explanation: "You'll now be asked to place this adder in various positions...",
	testComplete: function(){
		return (myOperators.length==1
			&&myOperators[0].type===ADDER
			&&myOperators[0].myInput1.imaginary!=0
			&&myOperators[0].myInput2.imaginary!=0);
	}
};

myLevels[1] = {
	DRO: true,
	instructions: "Find\n 3 + 5",
	explanation: false,

	inputTarget1X: 3,
	inputTarget1Y: 0,
	inputTarget2X: 5,
	inputTarget2Y: 0,
	outputTargetX: 8,
	outputTargetY: 0,

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

myLevels[2] = {
	DRO: true,
	instructions: "Find\n 7 + 4",
	explanation: false,

	inputTarget1X: 7,
	inputTarget1Y: 0,
	inputTarget2X: 4,
	inputTarget2Y: 0,
	outputTargetX: 11,
	outputTargetY: 0,
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

myLevels[3] = {
	DRO: true,
	instructions: "Find\n 1 + 1",
	explanation: false,

	inputTarget1X: 1,
	inputTarget1Y: 0,
	inputTarget2X: 1,
	inputTarget2Y: 0,
	outputTargetX: 2,
	outputTargetY: 0,
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

myLevels[4] = {
	DRO: true,
	instructions: "Find\n (-3) + 8",
	inputTarget1X: -3,
	inputTarget1Y: 0,
	inputTarget2X: 8,
	inputTarget2Y: 0,
	outputTargetX: 5,
	outputTargetY: 0,
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


myLevels[5] = {
	DRO: true,
	instructions: "Find\n (-6) + (-2)",
	inputTarget1X: -6,
	inputTarget1Y: 0,
	inputTarget2X: -2,
	inputTarget2Y: 0,
	outputTargetX: -8,
	outputTargetY: 0,
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



myLevels[6] = {
	DRO: true,
	instructions: "Find\n (-9) + (-3)",
	inputTarget1X: -9,
	inputTarget1Y: 0,
	inputTarget2X: -3,
	inputTarget2Y: 0,
	outputTargetX: -12,
	outputTargetY: 0,
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

myLevels[7] = {
	DRO: true,
	instructions: "Find\n 3i + 2i",
	inputTarget1X: 0,
	inputTarget1Y: 3,
	inputTarget2X: 0,
	inputTarget2Y: 2,
	outputTargetX: 0,
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

myLevels[8] = {
	DRO: true,
	instructions: "Find\n (-3i) + (-4i)",
	inputTarget1X: 0,
	inputTarget1Y: -3,
	inputTarget2X: 0,
	inputTarget2Y: -4,
	outputTargetX: 0,
	outputTargetY: -7,
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

myLevels[9] = {
	DRO: true,
	instructions: "Find\n 3 + 2i",
	inputTarget1X: 3,
	inputTarget1Y: 0,
	inputTarget2X: 0,
	inputTarget2Y: 2,
	outputTargetX: 3,
	outputTargetY: 2,
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

myLevels[10] = {
	DRO: true,
	instructions: "Find\n 4i + 10",
	inputTarget1X: 0,
	inputTarget1Y: 4,
	inputTarget2X: 10,
	inputTarget2Y: 0,
	outputTargetX: 10,
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


myLevels[11] = {
	DRO: true,
	instructions: "Find\n (-2,5i) + 0",
	explanation: "Anything plus zero is always equal to itself.",
	inputTarget1X: -2,
	inputTarget1Y: 5,
	inputTarget2X: 0,
	inputTarget2Y: 0,
	outputTargetX: -2,
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

myLevels[12] = {
	DRO: true,
	instructions: "Find\n (2,3i) + (5,-3i)",
	explanation: "Note how the vertical components cancel.",
	inputTarget1X: 2,
	inputTarget1Y: 3,
	inputTarget2X: 5,
	inputTarget2Y: -3,
	outputTargetX: 7,
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
	instructions: "Find\n (4,-3i) + (-12,-4i)",
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

myLevels[14] = {
	DRO: true,
	instructions: "Find\n (2,3i) + (2,3i)",
	explanation: "Note how we're adding a number to itself. \n \n This is the effectively a doubling:\n x + x = 2x",

	inputTarget1X: 2,
	inputTarget1Y: 3,
	inputTarget2X: 2,
	inputTarget2Y: 3,
	outputTargetX: 4,
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

myLevels[15] = {
	instructions: "Click-and-hold the two inputs on (2,3i) to merge them.",
	explanation: "You've made a doubler! Move it around to see how it behaves.",

	testComplete: function(){
		if(myOperators.length==1&&myOperators[0].mode==COLLAPSED){
			return true;
		}else{
			return false;
		}
	}
};


myLevels[16] = {
	DRO: true,
	instructions: "Find\n the double of 3",


	inputTarget1X: 3,
	inputTarget1Y: 0,

	outputTargetX: 6,
	outputTargetY: 0,
	testComplete: function(){
		if(myOperators.length==1){

			let inputComplete = (dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget1X),axisToPixelY(this.inputTarget1Y))<15);
			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<15);

			return inputComplete&&outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[17] = {
	DRO: true,
	instructions: "Find\n the double of 6",


	inputTarget1X: 6,
	inputTarget1Y: 0,

	outputTargetX: 12,
	outputTargetY: 0,
	testComplete: function(){
		if(myOperators.length==1){

			let inputComplete = (dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget1X),axisToPixelY(this.inputTarget1Y))<15);
			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<15);

			return inputComplete&&outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[18] = {
	DRO: true,
	instructions: "Find\n the double of (-2)",


	inputTarget1X: -2,
	inputTarget1Y: 0,

	outputTargetX: -4,
	outputTargetY: 0,
	testComplete: function(){
		if(myOperators.length==1){

			let inputComplete = (dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget1X),axisToPixelY(this.inputTarget1Y))<15);
			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<15);

			return inputComplete&&outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[19] = {
	DRO: true,
	instructions: "Find\n the double of i",


	inputTarget1X: 0,
	inputTarget1Y: 1,

	outputTargetX: 0,
	outputTargetY: 2,
	testComplete: function(){
		if(myOperators.length==1){

			let inputComplete = (dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget1X),axisToPixelY(this.inputTarget1Y))<15);
			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<15);

			return inputComplete&&outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[20] = {
	DRO: true,
	instructions: "Find\n the double of (-4i)",


	inputTarget1X: 0,
	inputTarget1Y: -4,

	outputTargetX: 0,
	outputTargetY: -8,
	testComplete: function(){
		if(myOperators.length==1){

			let inputComplete = (dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget1X),axisToPixelY(this.inputTarget1Y))<15);
			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<15);

			return inputComplete&&outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[21] = {
	instructions: "Double-click on the number at (-8i) to take control of it.",
	explanation: "You're doubler is now a halver! Move it around to see how it behaves.",

	testComplete: function(){
		if(myOperators.length==1&&myOperators[0].mode==REVCOLLAPSED){
			return true;
		}else{
			return false;
		}
	}
};

myLevels[22] = {
	DRO: true,
	instructions: "Find\n half of 10",


	inputTarget1X: 5,
	inputTarget1Y: 0,

	outputTargetX: 10,
	outputTargetY: 0,
	testComplete: function(){
		if(myOperators.length==1){

			let inputComplete = (dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget1X),axisToPixelY(this.inputTarget1Y))<15);
			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<15);

			return inputComplete&&outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[23] = {
	DRO: true,
	instructions: "Find\n half of (-6)",


	inputTarget1X: -3,
	inputTarget1Y: 0,

	outputTargetX: -6,
	outputTargetY: 0,
	testComplete: function(){
		if(myOperators.length==1){

			let inputComplete = (dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget1X),axisToPixelY(this.inputTarget1Y))<15);
			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<15);

			return inputComplete&&outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[24] = {
	DRO: true,
	instructions: "Find\n half of 8i",


	inputTarget1X: 0,
	inputTarget1Y: 4,

	outputTargetX: 0,
	outputTargetY: 8,
	testComplete: function(){
		if(myOperators.length==1){

			let inputComplete = (dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget1X),axisToPixelY(this.inputTarget1Y))<15);
			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<15);

			return inputComplete&&outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[25] = {
	DRO: true,
	instructions: "Find\n half of (-2i)",
	explanation: "End of Section 1.",


	inputTarget1X: 0,
	inputTarget1Y: -1,

	outputTargetX: 0,
	outputTargetY: -2,
	testComplete: function(){
		if(myOperators.length==1){

			let inputComplete = (dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget1X),axisToPixelY(this.inputTarget1Y))<15);
			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<15);

			return inputComplete&&outputComplete;
		}else{
			return false;
		}
	}
};











































