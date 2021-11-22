myLevels[0] = {

    instructions: "Free Play",

    testComplete: function(){
	return true
    }
};


myLevels[1] = {
    tracers: true,
    instructions: "Tracers",
    
    testComplete: function(){
    return true
    }
};


myLevels[2] = {
    customScale: 300,
    unitCircle: true,
    showWedges: true,
    wedgeRO: true,
    degrees: true,
    instructions: "Place a multiplier on the board",
    explanation: "This multiplier is stuck on the unit circle. It is effectively and angle adder.",
    testComplete: function(){
    return (myOperators.length==1
        && myOperators[0].type===MULTIPLIER);
    }
};

myLevels[3] = {

    concentricCircles: true,
    showWedges: true,
    wedgeRO: true,

    instructions: "Place a multiplier on the board",
    explanation: "Note how the this multiplies the radii of circles (regardless of angle)",
    testComplete: function(){
    return (myOperators.length==1
        && myOperators[0].type===MULTIPLIER);
    }
};