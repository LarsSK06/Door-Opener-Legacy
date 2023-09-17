import os
import sys
import json
import datetime

def main(args):
    newData = []
    if os.path.exists("request-log.json"):
        with open("request-log.json", mode="r") as existingData:
            newData.append(json.load(existingData))
    newData.append({
        "username": args[1],
        "time": datetime.datetime.now()
    })
    with open("request-log.json", mode="w") as newFile:
        newFile.write(json.dumps(newData))
        newFile.close()

if len(sys.argv) > 0: main(sys.argv)