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
	instructions: "Find\n (2,i) x (2,i)",


	inputTarget1X: 2,
	inputTarget1Y: 1,
	inputTarget2X: 2,
	inputTarget2Y: 1,
	outputTargetX: 3,
	outputTargetY: 4,

	testComplete: function(){
		if(myOperators.length==1){

			let inputComplete = (dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget1X),axisToPixelY(this.inputTarget1Y))<20)||
								(dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget2X),axisToPixelY(this.inputTarget2Y))<20);
			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<20);

			return inputComplete&&outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[2] = {
	DRO: false,
	instructions: "Press-and-hold the inputs on (2,i) to merge them.",

	explanation: "You've made a squarer! Move it around to see how it behaves",

	testComplete: function(){
		return (myOperators[0].mode==COLLAPSED);
	}
};

myLevels[3] = {

	DRO: true,

	instructions: "Find\n 2 squared",
	explanation: false,

	inputTarget1X: 2,
	inputTarget1Y: 0,
	inputTarget2X: 2,
	inputTarget2Y: 0,
	outputTargetX: 4,
	outputTargetY: 0,
	testComplete: function(){
		if(myOperators.length==1){

			let inputComplete = (dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget1X),axisToPixelY(this.inputTarget1Y))<20)||
								(dist(myOperators[0].myInput1.getRealPx(),myOperators[0].myInput1.getImaginaryPx(),axisToPixelX(this.inputTarget2X),axisToPixelY(this.inputTarget2Y))<20);
			let outputComplete = (dist(myOperators[0].myOutput.getRealPx(),myOperators[0].myOutput.getImaginaryPx(),axisToPixelX(this.outputTargetX),axisToPixelY(this.outputTargetY))<20);

			return inputComplete&&outputComplete;
		}else{
			return false;
		}
	}
};

myLevels[4] = {
	DRO: true,

	instructions: "Find\n 3 squared",
	explanation: false,

	inputTarget1X: 3,
	inputTarget1Y: 0,
	inputTarget2X: 3,
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

myLevels[5] = {
	DRO: true,

	instructions: "Find\n i squared",
	explanation: "Note that i^2 = -1 is the DEFINTION of i",


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

myLevels[6] = {
	DRO: true,

	instructions: "Find\n 3i squared",

	inputTarget1X: 0,
	inputTarget1Y: 3,
	inputTarget2X: 0,
	inputTarget2Y: 3,
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




myLevels[7] = {
	DRO: true,
	instructions: "Find\n (-2) squared",
	inputTarget1X: -2,
	inputTarget1Y: 0,
	inputTarget2X: -2,
	inputTarget2Y: 0,
	outputTargetX: 4,
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

myLevels[8] = {
	DRO: true,
	instructions: "Find\n (-3i) squared",
	inputTarget1X: 0,
	inputTarget1Y: -3,
	inputTarget2X: 0,
	inputTarget2Y: -3,
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

myLevels[9] = {
	DRO: true,
	instructions: "Find\n (2,i) squared",
	inputTarget1X: 2,
	inputTarget1Y: 1,
	inputTarget2X: 2,
	inputTarget2Y: 1,
	outputTargetX: 3,
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

myLevels[10] = {
	DRO: true,

	instructions: "Find\n (-2,2i) squared",

	inputTarget1X: -2,
	inputTarget1Y: 2,
	inputTarget2X: -2,
	inputTarget2Y: 2,
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

myLevels[11] = {
	DRO: true,

	instructions: "Find\n (-3) squared",
	explanation: "Notice that there is ANOTHER number which gives 9 when you square it...",

	inputTarget1X: -3,
	inputTarget1Y: 0,
	inputTarget2X: -3,
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




myLevels[12] = {
	DRO: true,

	instructions: "Find\n 3 squared",
	explantion: "So both 3 and (-3) square to 9.",

	inputTarget1X: 3,
	inputTarget1Y: 0,
	inputTarget2X: 3,
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

myLevels[13] = {
	DRO: false,
	instructions: "Double click on the number at 9 to take control of it.",
	explanation: "You've turned your squarer into a square rooter!\n\nNotice that we are seeing an INCOMPLETE answer to the question 'What's the square root of 9?'\n\n Both 3 and (-3) fit this description, but the square rooter is only showing us one answer.",

	testComplete: function(){
		return myOperators[0].mode==REVCOLLAPSED;
	}
};

myLevels[14] = {
	DRO: true,
	instructions: "Find\n a square root of 4",

	inputTarget1X: 2,
	inputTarget1Y: 0,
	inputTarget2X: 2,
	inputTarget2Y: 0,
	outputTargetX: 4,
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
	instructions: "Find\n a square root of 8i",
	explanation: "***Explain geometrically why it makes sense that this is the square root?",

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

myLevels[16] = {
	DRO: true,
	instructions: "Find\n a square root of (-1)",
	explanation: "Once again,\n 'sqrt(-1) = i'\n is a DEFINITION of i.",

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

myLevels[17] = {
	DRO: true,
	instructions: "Find\n a square root of (-2i)",

	inputTarget1X: -1,
	inputTarget1Y: 1,
	inputTarget2X: -1,
	inputTarget2Y: 1,
	outputTargetX: 0,
	outputTargetY: -2,
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
	DRO: true,
	instructions: "Find\n a square root of 9",
	explanation: "Notice that now we're getting the OTHER square root of 9!\n\n The square rooter has switched from showing 3 to -3.",

	inputTarget1X: -3,
	inputTarget1Y: 0,
	inputTarget2X: -3,
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

myLevels[19] = {
	DRO: true,
	instructions: "Drag the number at 9 in a loop around the center, and then place it back on 9",
	explanation: "Every number has two square roots. You can switch from one to the other by circulating the red number around the center.",

	inputTarget1X: 3,
	inputTarget1Y: 0,
	inputTarget2X: 3,
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

myLevels[20] = {
	DRO: true,
	instructions: "Find\n a square root of 4",


	inputTarget1X: -2,
	inputTarget1Y: 0,
	inputTarget2X: 2,
	inputTarget2Y: 0,
	outputTargetX: 4,
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
	instructions: "Find\n the OTHER square root of 4",


	inputTarget1X: -2,
	inputTarget1Y: 0,
	inputTarget2X: 2,
	inputTarget2Y: 0,
	outputTargetX: 4,
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

