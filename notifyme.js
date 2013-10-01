var sys = require('sys')
var execSync = require("exec-sync");



var i = 0,
// iDelay = 999;
iDelay = 1000 * 60 * 20;
runRnd();
checkSleep();


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

function runRnd() {
    var t = setTimeout(function() {
        checkSleep();
        var i = Math.floor((Math.random() * msgs.length) + 0);
        sendMsg(msgs[i].title, msgs[i].msg);
        console.log(i, msgs[i].title, msgs[i].msg);
        runRnd();
    }, iDelay);
}

function checkSleep() {
    var d = new Date();
    var h = d.getHours();
    if (h < 9 || h > 21) {
        iDelay = iDelay / 1.2;
        var i = Math.floor((Math.random() * sleepMsgs.length) + 0);
        sendMsg(sleepMsgs[i].title, sleepMsgs[i].msg);
    }
};


