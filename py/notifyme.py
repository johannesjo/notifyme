#!/usr/bin/python
import json
import time
import subprocess
from random import randint

json_data = open('/home/johannes/scripts/msgs/msgs2.json').read()
data = json.loads(json_data)
curr = data['msgs'][len(data['msgs']) - 2]
delay = 60 * 10


def sendMsg(title, msg):
    title = title + " "
    msg = msg + " "
    notifySend = ['notify-send', title, msg]
    process = subprocess.Popen(notifySend, stdout=subprocess.PIPE)
    output = process.communicate()[0]
    print output


def endlessRepeat(msgs, delay):
    length = len(data['msgs']) - 1
    rndi = randint(0, length)
    sendMsg(msgs[rndi]['title'], msgs[rndi]['msg'])
    sendMsg('test', 'test')
    time.sleep(delay)
    endlessRepeat(msgs, delay)

endlessRepeat(data['msgs'], delay)
