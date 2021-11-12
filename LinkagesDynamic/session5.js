myLevels[0] = {
	instructions: "Using an adder, find half of (4,6i)",

	tracers: true,
	
	inputTarget1X: 2,
	inputTarget1Y: 3,
	inputTarget2X: 2,
	inputTarget2Y: 3,
	outputTargetX: 4,
	outputTargetY: 6,

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
