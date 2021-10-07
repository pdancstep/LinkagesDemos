
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

function findMerge() {
    // index of first bindable node we find
    let first = false;

    // find two nodes to bind together
    for (let i=0; i < myNumbers.length; i++) {
	let node = myNumbers[i];
	if (node.checkMouseover()) {
	    if (first===false) {
		first = i;
	    } else if (mergeNodes(first, i)) {
		indicatorFlash = true;
		return;
	    }
	}
    }
}

// combine two nodes (essentially, add the second node's properties to the first)
// returns true if a merge was successfully performed
function mergeNodes(idx1, idx2) {
    let node1 = myNumbers[idx1];
    let node2 = myNumbers[idx2];
    
    if (node1.free && node2.free) {
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
	    if (node1.operators.includes(oper)) {
		oper.collapse(node1, node2);
	    }else{
		oper.replace(node1, node2);
	    }
	}
	
	// add node2's former operators to node1's operators
	node1.operators = node1.operators.concat(node2.operators);
	
	// remove node2 from the graph
	myNumbers.splice(idx2, 1);
	return true;
    } else {
	// cannot merge: both nodes already dependent
	return false;
    }
}

// tell each operator to see if it's being asked to perform a reversal
// if no operator reports a choice is needed from the user, clear freeNode data
function tryReversal() {
    let rev = false;
    for (const oper of myOperators) {
	rev = oper.reverseOperator();
	if (rev) break;
    }
    if (!reversingOperator) {
	freeNodes = [];
	freeNodePaths = [];
    }
}

// check freeNodes for user selection. clear freeNode data.
function closeReversal() {
    for (let i = 0; i < freeNodes.length; i++) {
	if (freeNodes[i].checkMouseover()) {
	    reverseByPath(freeNodePaths[i]);
	}
    }
    reversingOperator = false;
    freeNodes = [];
    freeNodePaths = [];
}

// instruct each operator along the designated freeNodePath to reverse
function reverseByPath(path) {
    while (path.length > 0) {
	let argument = path.pop();
	let operator = path.pop();
	operator.finishReversal(argument);
    }
}
