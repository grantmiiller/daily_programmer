"use strict";

function SemVar(version) {
	this.version = version || '';
	this.major = 0;
	this.minor = 0;
	this.patch = 0;
	this.label = '';
	this.meta  = '';
}

SemVar.prototype.compareType = function(type, semvar) {
	var result = null;
	if(this[type] === undefined) { return result; }

	if(type === 'label') {

		if(this[type] && !semvar[type]) {
			result = "less";
		} else if(!this[type] && semvar[type]) {
			result = "greater";
		} else {
			result = "equal";
		}
	} else {

		if(this[type] > semvar[type]) {
			result = "greater";
		} else if(this[type] === semvar[type]) {
			result = "equal";
		} else {
			result = "less";
		}
	}

	return result;
};

SemVar.prototype.compareMajor = function(semvar) {
	return this.compareType('major', semvar);
};

SemVar.prototype.compareMinor = function(semvar) {
	return this.compareType('minor', semvar);
};

SemVar.prototype.comparePatch = function(semvar) {
	return this.compareType('patch', semvar);
};

SemVar.prototype.compare = function(semvar) {
	var result,
		self = this,
		types = ['major', 'minor', 'patch', 'label'];
	
	types.every(function(value, index, array) {

		result = self.compareType(value, semvar);

		if(result !== "equal") {
			return false;
		}

		return true;
	});

	return result;
};

function semVar(version, undefined) {
	var temp = version.split('+'),
		semObj = new SemVar(version);

	semObj.meta = temp[1] ? temp[1] : '';

	temp = temp[0].split('-');
	semObj.label = temp[1] ? temp[1] : '';

	temp = temp[0].split('.');
	semObj.major = temp[0] ? parseInt(temp[0], 10) : 0;
	semObj.minor = temp[1] ? parseInt(temp[1], 10) : 0;
	semObj.patch = temp[2] ? parseInt(temp[2], 10) : 0;

	return semObj;
}

var fs = require('fs');

var stream = fs.createReadStream('./input.txt'),
	body = '',
	vers = [],
	results = [];

stream.on('data', function(data) {
	body += data;
});

stream.on('end', function() {
	var temp;
	vers = body.split('\n').slice(1);

	vers.forEach(function(value, index, array) {
		temp = semVar(value);

		if(results.length > 0) {

			results.every(function(value, index, array) {
				var test = temp.compare(results[index]);

				if(test === "less" || test === "equal") {
					results.splice(index, 0, temp);
					return false;
				}

				if(results.length === index + 1) {
					results.push(temp);
					return false;
				}

				return true;
			});

		} else {
			results.push(temp);
		}
	});

	results.forEach(function(value) {
		console.log(value.version);
	});
});