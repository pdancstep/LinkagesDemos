
// overall graph lives in these two global arrays
var myNumbers = [];
var myOperators = [];

// nodes to potentially give up control of when in reversal mode
var freeNodes = [];
var reversingOperator = false;

function registerNode(node) {
    myNumbers.push(node);
}

function registerOperator(oper) {
    myOperators.push(oper);
}

function mergeNodes(idx1, idx2) {
    let node1 = myNumbers[idx1];
    let node2 = myNumbers[idx2];
    if (node1.free || node2.free) {
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
	
	// merged node is free iff both parents were free
	node1.free = node1.free && node2.free;

	// remove node2 from the graph
	myNumbers.splice(idx2, 1);
	return node1;
    } else {
	// cannot merge: both nodes already dependent
	return false;
    }
}
