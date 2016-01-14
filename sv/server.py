import logging
from flask import Flask
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop

class Server(object):

    def __init__(self, host, port):
        self.host = host
        self.port = port

        self.app = Flask(__name__, static_url_path='', static_folder='static/')


    def listen(self):
        logging.info("Listening on port %u", self.port)
        http_server = HTTPServer(WSGIContainer(self.app))
        http_server.listen(self.port)
        IOLoop.instance().start()

    def initialize(self):
        self.initialize_static_routes()
        self.initialize_api_routes()

    def initialize_static_routes(self):

        @self.app.route('/')
        def index():
            return self.app.send_static_file('index.html')

    def initialize_api_routes(self):
        pass

