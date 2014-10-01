"use strict";

if(process.argv.length > 2) {
    var input = process.argv[2];
} else {
    process.stderr.write('You need to provide a string \n');
    process.exit(1);
}

var finalResults = getUniqueSetLoop(input.split(''));

printArray(finalResults);

console.log('The Length is: ' + factorial(input.length));

function getUniqueSetLoop(input) {
	var lastLoop = [],
		tempArray = [],
		temp, k, x;

	for( var i = 0; i < input.length; i++ ) {
		if(lastLoop.length < 1) {
			tempArray.push(input[i]);
		} else {
			for(k = 0; k < lastLoop.length; k++) {
				temp = lastLoop[k];
				for(x = 0; x <= temp.length; x++) {
					tempArray.push(temp.slice(0, x) + input[i] + temp.slice(x, temp.length));
				}
			}
		}

		lastLoop = tempArray.slice(0);
		tempArray.length = 0;
	}

	return lastLoop;
}

function getUniqueSet(input) {
	if(input.length === 1) {
		return input;
	} else {
		var currentMinus1 = getUniqueSet(input.slice(0, input.length-1)),
			ch = input[input.length - 1],
			results = [],
			temp, i, k;

		for(i = 0; i < currentMinus1.length; i++) {
			temp = currentMinus1[i];
			for(k = 0; k <= temp.length; k++ ) {
				results.push(temp.slice(0, k) + ch + temp.slice(k, temp.length));
			}
		}

		return results;
	}
}

function printArray(input) {
	for(var i = 0; i < input.length; i++) {
		console.log(input[i]);
	}
}

function factorial(num) {
	if(num === 1) {
		return num;
	} else {
		return num * factorial(num - 1);
	}
}