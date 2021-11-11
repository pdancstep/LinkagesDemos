myLevels[0] = {
	DRO:true,
	instructions: "Find\n 4+7",

	inputTarget1X: 4,
	inputTarget1Y: 0,
	inputTarget2X: 7,
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

myLevels[1] = {
	DRO:true,
	instructions: "Now move the dot at 4. Drag it to a position that puts the blue dot on zero",
	explanation: "Notice how the two inputs are opposite:\n 7 and -7 \n\nWe call a number and its negative 'additive inverses' since they add up to zero.",

	inputTarget1X: -7,
	inputTarget1Y: 0,
	inputTarget2X: 7,
	inputTarget2Y: 0,
	outputTargetX: 0,
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
	DRO:true,
	instructions: "Find the additive inverse of 10",
	explanation: "Whenever the blue dot is on zero, the other corners MUST BE additive inverses.",

	inputTarget1X: 10,
	inputTarget1Y: 0,
	inputTarget2X: -10,
	inputTarget2Y: 0,
	outputTargetX: 0,
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
	DRO:true,
	instructions: "Find the additive inverse of -4i",

	inputTarget1X: 0,
	inputTarget1Y: -4,
	inputTarget2X: 0,
	inputTarget2Y: 4,
	outputTargetX: 0,
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
	DRO:true,
	instructions: "Find the additive inverse of (1,3i)",
	explanation: "Notice how, geometrically, additive inverses are always 180° around the center from one another.",

	inputTarget1X: 1,
	inputTarget1Y: 3,
	inputTarget2X: -1,
	inputTarget2Y: -3,
	outputTargetX: 0,
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
	DRO:true,
	instructions: "Find the additive inverse of (-8,6i)",

	inputTarget1X: -8,
	inputTarget1Y: 6,
	inputTarget2X: 8,
	inputTarget2Y: -6,
	outputTargetX: 0,
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
	DRO:true,
	instructions: "Now we'll show a better way to find additive inverses.\n First, find\n (1,3i)+(3,1i)",

	inputTarget1X: 1,
	inputTarget1Y: 3,
	inputTarget2X: 3,
	inputTarget2Y: 1,
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

myLevels[7] = {

	instructions: "Now double click on the blue dot at (4,4i)",
	reverseMessage: "Now click on the white dot at (1,3i)",
	explanation: "Now you can move the parallelogram by dragging the blue dot.",

	inputTarget1X: -8,
	inputTarget1Y: 6,
	inputTarget2X: 8,
	inputTarget2Y: -6,
	outputTargetX: 0,
	outputTargetY: 0,

	testComplete: function(){
		if(myOperators.length==1
			&&myOperators[0].type==ADDER
			&&(myOperators[0].mode==REVERSE1
				||myOperators[0].mode==REVERSE2)){
			return true;
		}else{
			return false;
		}
	}
};

myLevels[8] = {
	instructions: "Place the blue dot on zero.",
	explanation: "Notice how the two inputs are automatically on additive inverses:\n(3,1i) and (-3,-1i).",

	inputTarget1X: 3,
	inputTarget1Y: 1,
	inputTarget2X: -3,
	inputTarget2Y: -1,
	outputTargetX: 0,
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

myLevels[9] = {
	DRO:true,
	instructions: "Moving only one dot, find the additive inverse of 10",

	inputTarget1X: 10,
	inputTarget1Y: 0,
	inputTarget2X: -10,
	inputTarget2Y: 0,
	outputTargetX: 0,
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

myLevels[10] = {
	DRO:true,
	instructions: "Find the additive inverse of 4i",

	inputTarget1X: 0,
	inputTarget1Y: -4,
	inputTarget2X: 0,
	inputTarget2Y: 4,
	outputTargetX: 0,
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

myLevels[11] = {
	DRO:true,
	instructions: "Find the additive inverse of (10,-6i)",

	inputTarget1X: 10,
	inputTarget1Y: -6,
	inputTarget2X: -10,
	inputTarget2Y: 6,
	outputTargetX: 0,
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


myLevels[12] = {
	DRO:true,
	instructions: "Find the additive inverse of 5",
	explanation: "Right now, we're using the adder to find two numbers that add up to zero.\n\n What if we want to find two numbers that add up to something else?",

	inputTarget1X: 5,
	inputTarget1Y: 0,
	inputTarget2X: -5,
	inputTarget2Y: 0,
	outputTargetX: 0,
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

myLevels[13] = {
	instructions: "Move the blue dot from zero to 12.",
	explanation: "In this position, we see that SEVEN is what we add to 5 to get 12.\n\nOr, to put it another way, 12-5=7.",

	inputTarget1X: 5,
	inputTarget1Y: 0,
	inputTarget2X: 7,
	inputTarget2Y: 0,
	outputTargetX: 12,
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

myLevels[14] = {
	DRO:true,
	instructions: "So we can use this 'reverse adder' to ask subtraction questions.\nFind\n12-9",


	inputTarget1X: 3,
	inputTarget1Y: 0,
	inputTarget2X: 9,
	inputTarget2Y: 0,
	outputTargetX: 12,
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

myLevels[15] = {
	DRO:true,
	instructions: "Find\n12-2",


	inputTarget1X: 10,
	inputTarget1Y: 0,
	inputTarget2X: 2,
	inputTarget2Y: 0,
	outputTargetX: 12,
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

myLevels[16] = {
	DRO:true,
	instructions: "What if we subtract a larger number from a smaller number?\nFind\n5-8",
	explanation: "The reverse adder can give negative answers.",

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

myLevels[17] = {
	DRO:true,
	instructions: "What does it mean to subtract a negative number?\nFind\n5-(-4)",
	explanation: "The reverse adder handles the fact that subtracting the negative of a number is the same as adding that number.",

	inputTarget1X: -4,
	inputTarget1Y: 0,
	inputTarget2X: 9,
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


myLevels[18] = {
	DRO:true,
	instructions: "Interesting numbers work the same way as regular numbers.\nFind\n8i-2i",


	inputTarget1X: 0,
	inputTarget1Y: 2,
	inputTarget2X: 0,
	inputTarget2Y: 6,
	outputTargetX: 0,
	outputTargetY: 8,

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

myLevels[19] = {
	DRO:true,
	instructions: "Find\n-8i - (-3i)",


	inputTarget1X: 0,
	inputTarget1Y: -5,
	inputTarget2X: 0,
	inputTarget2Y: -3,
	outputTargetX: 0,
	outputTargetY: -8,

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

myLevels[20] = {
	DRO:true,
	instructions: "Find\n(3,7i) - (-3,5i)",


	inputTarget1X: -3,
	inputTarget1Y: 5,
	inputTarget2X: 6,
	inputTarget2Y: 2,
	outputTargetX: 3,
	outputTargetY: 7,

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

myLevels[21] = {
	DRO:true,
	instructions: "Find\n(-8,-3i) - (-8,-6i)",


	inputTarget1X: 0,
	inputTarget1Y: 3,
	inputTarget2X: -8,
	inputTarget2Y: -6,
	outputTargetX: -8,
	outputTargetY: -3,

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

myLevels[22] = {

	instructions: "To turn the reverse adder back into a regular adder, double click the dot on 3i",
	reverseMessage: "Now click on the white dot at (-8,-3i)",
	explanation: "Now you're back to having a regular adder.",


	testComplete: function(){
		if(myOperators.length==1
			&&myOperators[0].type==ADDER
			&&myOperators[0].mode==DEFAULT){
			return true;
		}else{
			return false;
		}
	}
};

myLevels[23] = {
	DRO:true,
	instructions: "Find\n(1,3i) + (-8,3i)",


	inputTarget1X: 1,
	inputTarget1Y: 3,
	inputTarget2X: -8,
	inputTarget2Y: 3,
	outputTargetX: -7,
	outputTargetY: 6,

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

myLevels[24] = {
	DRO:true,
	instructions: "Find\n(2,-4i) - (5,3i)",
	explanation: "End of section 3.",


	inputTarget1X: 5,
	inputTarget1Y: 3,
	inputTarget2X: -3,
	inputTarget2Y: 1,
	outputTargetX: 2,
	outputTargetY: -4,

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

