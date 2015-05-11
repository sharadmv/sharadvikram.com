from flask import Flask

server = Flask(__name__)

def run(port=8080, debug=False):
    server.debug = debug
    server.listen(8080)
