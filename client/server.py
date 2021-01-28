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

        # call restAPI
        jarvisComputeOBJ = JARVIS()
        subprocess.call(['../restAPI.exe', jarvisComputeOBJ.compute(query)])
        return readFile("static/index.html")
    
    if __name__ == "__main__":
        app.run()
