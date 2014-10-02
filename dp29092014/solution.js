var fs = require('fs');

// Get text file stream
var stream = fs.createReadStream('./input.txt'),
	// Contains input for txt file
	body = "",
	results = [],	
	// Regex to grab the first line of file which contains configuration data
	firstLineRegEx = /(.+)\n/,
	columnNum = 2,
	columnWidth = 25,
	spaceWidth = 5;


stream.on('data', function(data) {
	body += data;
});

// Fires when we get all the data
stream.on('end', function() {
	var firstLine = firstLineRegEx.exec(body)[1].split(' '),
		firstLineLength = firstLineRegEx.exec(body)[0].length,
		columns = [],
		breakTest = true,
		counter = 0,
		resLength,
		match,
		re;

	// Remove the config data from the bodys
	body = body.slice(firstLineLength);

	columnNum = parseInt(firstLine[0], 10);
	columnWidth = parseInt(firstLine[1], 10);
	spaceWidth = parseInt(firstLine[2], 10);

	// Calculate the total width of each column for convenience
	var totalWidth = spaceWidth + columnWidth;

	// Regex to grab the number of characters from a string, ignoring newlines
	re = new RegExp("(.{0," + columnWidth + "})\\n?");

	var perColumn = body.length / columnNum;

	// Split up text into their columns
	for(var i = 0; i < columnNum; i++) {
		columns.push(body.slice(i * perColumn, (i + 1) * perColumn));
	}


	// Loop that goes through each column array until there are no more characters in thtem
	while(true) {
		results[counter] = '';
		// Loop through each column
		for(i = 0; i < columns.length; i++) {

			// We only get data from columns if it contains it
			if(columns[i].length > 0) {
				// This checks to see if we should jump out of our infinite loop
				breakTest = false;
				// If the current line is not long enough, add extra padding
				if(results[counter].length < totalWidth * i) {
					resLength = results[counter].length;
					results[counter] = results[counter] + Array(i * totalWidth + 1 - resLength).join(' ');
				} 
				// Get a match of the substring to add to the results
				match = columns[i].match(re);
				// match[1] contains the actual string returned from the regex
				// while match[0] contains the string that caused it to fire
				results[counter] = results[counter] + match[1];

				// We use match[0] to remove pesky newlines
				columns[i] = columns[i].slice(match[0].length);
			} else {
				breakTest = true;
			}
		}

		counter++;

		if(breakTest) {
			break;
		}
	}

	writeResults();
});

function writeResults() {
	fs.writeFile('results.txt', results.join('\n'), function (err) {
		if(err) {
			return console.log(err);
		}
		console.log('data written');
	});
}