from flask import Flask

server = Flask(__name__)

def run(port=8080, debug=False):
    server.debug = debug
    server.run(port=8080)
