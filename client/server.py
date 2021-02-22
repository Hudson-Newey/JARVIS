from flask import Flask
from flask import request
import subprocess

def readFile(fileName):
    return open(fileName, "r").read()

# local imports
exec(readFile("../compute.py")) # logical processor

app = Flask(__name__)
class ClientServer:
    # homepage (default '/' directory)
    @app.route('/') 
    def home():
        query = request.args.get('q')
        
        if (query == None):
            return readFile("static/index.html")

        # compute to output
        jarvisComputeOBJ = JARVIS()
        (requestText, requestType) = jarvisComputeOBJ.compute(query)

        # determain where the request should be sent
        if (requestType == "restAPI"):
            # call rest API
            subprocess.call(['../restAPI.exe', requestText])

        elif (requestType == "text"):
            jarvisComputeOBJ.speakText(requestText)
        
        return readFile("static/index.html")
    
    if __name__ == "__main__":
        app.run(host='0.0.0.0')
