#!/usr/bin/env node

var sys = require('sys'),
	execSync = require("exec-sync"),
	fs = require('fs'),
	i = 0,
	bFirstTime = true,
		// iDelay = 2000;
	iDelay = 1000 * 60 * 20;


function readFile(sPath, fnAfter) {
	fs.readFile(sPath, 'utf8', function(err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}
		var oContent = JSON.parse(data);
		fnAfter(oContent)
	});
};

function sendMsg(title, msg) {
	console.log(title, msg)
	if (!title || title === "") {
		title = "__";
	} else if (!msg || msg === "") {
		msg = "__"
	}
	execSync("notify-send \"" + title + "\" \"" + msg + "\"");

}

function runAll() {
	var t = setTimeout(function() {

		sendMsg(msgs[i].title, msgs[i].msg);
		console.log(i, msgs[i].title, msgs[i].msg);

		i++;
		if (i < msgs.length)
			runAll();
	}, iDelay);
}

function timeOut(msgs) {
	var t = setTimeout(function() {
		runRnd(msgs);
	}, iDelay);
}

function runRnd(msgs) {
	var i = Math.floor((Math.random() * msgs.length) + 0);
	sendMsg(msgs[i].title, msgs[i].msg);
	console.log(i, msgs[i].title, msgs[i].msg);

	if (bCheckSleep()) {
		// call slepp stuff
		readFile('/home/johannes/scripts/notifyme/msgs/sleep-msgs.json', timeOut);
	} else {
		readFile('/home/johannes/scripts/notifyme/msgs/msgs.json', timeOut);
	}
}

function bCheckSleep() {
	var d = new Date();
	var h = d.getHours();
	if (h < 9 || h > 21) {
		iDelay = iDelay / 1.2;
		return true;
	} else {
		return false;
	}
};

if (bCheckSleep()) {
	// call slepp stuff
	readFile('/home/johannes/scripts/notifyme/msgs/sleep-msgs.json', runRnd);
} else {
	readFile('/home/johannes/scripts/notifyme/msgs/msgs.json', runRnd);
}