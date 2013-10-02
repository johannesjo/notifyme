#!/usr/bin/env node

var sys = require('sys'),
	execSync = require("exec-sync"),
	fs = require('fs'),
	i = 0,
	bFirstTime = true,
	iMinDelay = 1000 * 30,
// iDelay = 2000;
	iDelay = 1000 * 60 * 15;


function readFile(sPath, fnAfter) {
	fs.readFile(sPath, 'utf8', function (err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}
		var oContent = JSON.parse(data);
		fnAfter(oContent)
	});
};

function sendMsg(title, msg, icon) {
	console.log(title, msg, icon)
	var sCommand = 'notify-send';

	if (icon && icon !== "") {
		sCommand += ' -i ' + icon;
	}
	if (title && title) {
		sCommand += ' "' + title + ' "';
	}
	if (msg && msg !== "") {
		sCommand += ' "' + msg + '"';
	}
	console.log(sCommand);

	execSync(sCommand);

}

function runAll() {
	var t = setTimeout(function () {
		var msg = msg[i];

		sendMsg(msg.title, msg.msg, msg.icon);

		i++;
		if (i < msgs.length)
			runAll();
	}, iDelay);
}

function timeOut(msgs) {
	var t = setTimeout(function () {
		runRnd(msgs);
	}, iDelay);
}

function runRnd(msgs) {
	var i = Math.floor((Math.random() * msgs.length) + 0);
	var msg = msgs[i];
	sendMsg(msg.title, msg.msg, msg.icon);
	console.log(i, msg.title, msg.msg);

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
		if (iDelay > iMinDelay) {
			iDelay = iDelay / 1.02;
			if (h < 9) {
				iDelay = iDelay / 2;
			}
		} else {
			iDelay = iMinDelay;
		}
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