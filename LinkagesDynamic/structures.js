
// overall graph lives in these two global arrays
var myNumbers = [];
var myOperators = [];

// array holding sequential level specifications

var myLevels = [];

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

var _attempts = 0;

// combine two nodes (essentially, add the second node's properties to the first)
// returns true if a merge was successfully performed
function mergeNodes(idx1, idx2) {
    // don't keep trying if we've already made 2 recursive calls
    if (_attempts >= 2) {
	_attempts = 0;
	return false;
    }

    // get the nodes to be merged
    let node1 = myNumbers[idx1];
    let node2 = myNumbers[idx2];
    
    if (node1.free || node2.free) {
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
    } else if (node1.free) {
	// node2 is bound and should be reversed before merge
	let revstatus = node2.controller.reverseOperator();
	if (revstatus) {
	    if (reversingOperator) { // more than one possible reversal
		// complete the reversal
		let giveupnode = 0; // TODO try more than one possibility
		reverseByPath(freeNodePaths[giveupnode]);
		reversingOperator = false;
		freeNodes = [];
		freeNodePaths = [];
	    }
	    // reversal complete; try merge again
	    _attempts++;
	    return mergeNodes(idx1, idx2);
	}
	else { // could not reverse
	    return false;
	}
    } else if (node2.free) {
	// node1 is bound and should be reversed before merge
	let revstatus = node1.controller.reverseOperator();
	if (revstatus) {
	    if (reversingOperator) { // more than one possible reversal
		// complete the reversal
		let giveupnode = 0; // TODO try more than one possibility
		reverseByPath(freeNodePaths[giveupnode]);
		reversingOperator = false;
		freeNodes = [];
		freeNodePaths = [];
	    }
	    // reversal complete; try merge again
	    _attempts++;
	    return mergeNodes(idx1, idx2);
	}
	else { // could not reverse
	    return false;
	}
    } else {
	// cannot merge: both nodes are dependent
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
