import os
from argparse import ArgumentParser
import logging
logging.basicConfig(level=logging.DEBUG)

from . import Server

def parse_args():
    argparser = ArgumentParser()
    argparser.add_argument('--port', default=os.environ.get('PORT', 8080))
    argparser.add_argument('--host', default='0.0.0.0')
    return argparser.parse_args()

def main():
    args = parse_args()
    server = Server(args.host, args.port)
    server.initialize()
    server.listen()

if __name__ == "__main__":
    main()
