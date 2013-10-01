msgs = [{
    title: "Lieber Johannes,",
    msg: "Du bist insgesamt wahrscheinlich produktiver, wenn du früher ins Bett gehst und mehr Spaß hast!"
}, {
    title: "Lieber Johannes,",
    msg: "Sei nett zu dir!"
}, {
    title: "Lieber Johannes,",
    msg: "Stress dich nicht zu sehr!!"
}, {
    title: "Wie wäre es mit einem Apfel",
    msg: "Und wäre es nicht schön weniger zu rauchen?"
}, {
    title: "Mach doch mal einen Spaziergang",
    msg: "danach lösen sich die Probleme vielleicht von selbst."
}, {
    title: "Would I do it...?",
    msg: ""
}, {
    title: "Was ist das Wichtigste?",
    msg: ""
}, {
    title: "Die größten Schwierigkeiten liegen da, wo wir sie suchen.",
    msg: ""
}, {
    title: "Der eine sieht nur Bäume, Probleme dicht an dicht. ",
    msg: "Der andre Zwischenräume und das Licht."
}, {
    title: "Braucht man dieses Feature tatsächlich?",
    msg: "Oder brauchst du etwas mehr Freizeit?"
}, {
    title: "Wie wäre es mit ein bisschen Mind-Mapping",
    msg: "Planung ist gut! ;)"
}, {
    title: "Achte auf Deine Gedanken – sie sind der Anfang Deiner Taten.",
    msg: ""
}, {
    title: "",
    msg: "Zeit ist alles, was du hast. Du könntest eines Tages herausfinden, dass du weniger davon hast, als du denkst."
}, {
    title: "",
    msg: "Genau genommen leben sehr wenig Menschen in der Gegenwart. Die meisten bereiten sich vor, demnächst zu leben. – Jonathan Swift"
}, {
    title: "",
    msg: "Tu was du willst – aber nicht, weil du musst. – Buddha"
}, {
    title: "",
    msg: "Der Zimmermann bearbeitet das Holz. Der Schütze krümmt den Bogen. Der Weise formt sich selbst."
}, {
    title: "",
    msg: "In fließendem Wasser kann man sein eigenes Bild nicht sehen, wohl aber in ruhigem Wasser. Nur wer selbst ruhig bleibt, kann zur Ruhestätte all dessen werden, was Ruhe braucht. – Laotse"
}];

sleepMsgs = [{
    title: "Lieber Johannes,",
    msg: "Du bist insgesamt wahrscheinlich produktiver, wenn du früher ins Bett gehst und mehr Spaß hast!"
}, {
    title: "Lieber Johannes,",
    msg: "Sei nett zu dir!"
}, {
    title: "Wäre es nicht schön morgen ausgeruht zu sein?",
    msg: "Und vielleicht jetzt etwas früher im Bett zu liegen?"
},{
    title: "Relaxation",
    msg: "Essential, about 20 minutes each day. Vegging on the couch in front of the TV doesn’t quite do it, though. Here’s the deal: muscle relaxation is important because there’s a close connection between physical tension and mental tension. If you work on reducing physical tension, it’ll indirectly affect mental tension also, and it’s much easier to track.    So how do you do this? You actually take some time out, on your own without disturbances. Find a relaxation recording that you like. It’ll most likely be a mix of a relaxation exercise, and perhaps some music. Yep we know, many of those things are really really annoying, but they come in many different styles so  just find something that’s least offensive to you and try it for at least a few days.   We’ll probably start a separate page for this, with links and suggestions."
}];

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


