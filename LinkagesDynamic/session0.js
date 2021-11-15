myLevels[0] = {
    unitCircle: true,
    wedgeCompare: true,
    degrees: true,
    instructions: "Place a multiplier on the board",
    explanation: "This multiplier is stuck on the unit circle. It is effectively and angle adder.",
    testComplete: function(){
	return (myOperators.length==1
		&& myOperators[0].type===MULTIPLIER);
    }
};