
// overall graph lives in these two global arrays
var myNumbers = [];
var myOperators = [];

// nodes to potentially give up control of when in reversal mode
var freeNodes = [];
var freeNodePaths = [];
var reversingOperator = false;

function registerNode(node) {
    myNumbers.push(node);
}

function registerOperator(oper) {
    let i = myOperators.length;
    myOperators.push(oper);
    return i; 
}

// combine two nodes (essentially, add the second node's properties to the first)
function mergeNodes(idx1, idx2) {
    let node1 = myNumbers[idx1];
    let node2 = myNumbers[idx2];
    if (node1.free || node2.free) {
	// dependency
	if (!node2.free) {
	    // node1 is free but node2 is bound
	    // replace node1's dependency info with node 2's
	    node1.free = false;
	    node1.controller = node2.controller;
	}else{
	    // either both are free or node1 is bound and node2 is free
	    // we keep node1's dependency info, so there's nothing to do here
	}
	
	// replace node2 with node1 in all of node2's operators
	for (oper of node2.operators) {
	    if (oper.myInput1 === node2) {
		oper.myInput1 = node1;
	    }
	    if (oper.myInput2 === node2) {
		oper.myInput2 = node1;
	    }
	    if (oper.myOutput === node2) {
		oper.myOutput = node1;
	    }
	}
	// add node2's former operators to node1's operators
	node1.operators = node1.operators.concat(node2.operators);
	
	// remove node2 from the graph
	myNumbers.splice(idx2, 1);
	return node1;
    } else {
	// cannot merge: both nodes already dependent
	return false;
    }
}
