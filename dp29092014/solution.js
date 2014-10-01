var fs = require('fs');

var stream = fs.createReadStream('./test_input.txt'),
	body = "";
	firstLineRegEx = /(.+)\n/,
	columnNum = 2,
	columnWidth = 25,
	spaceWidth = 5;


stream.on('data', function(data) {
	body += data;
});

stream.on('end', function() {
	var firstLine = firstLineRegEx.exec(body)[1].split(' ');
		columns = [];
	columnNum = parseInt(firstLine[0], 10);
	columnWidth = parseInt(firstLine[1], 10);
	spaceWidth = parseInt(firstLine[2], 10);

	var perColumn = body.length / columnNum;

	for(var i = 0; i < columnNum; i++) {
		console.log(body.slice(i, i * perColumn));
		columns.push[body.slice(i, i * perColumn)];
	}

	console.log(columns)
});