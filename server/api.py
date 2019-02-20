from flask import jsonify
from webargs import Arg
from webargs.flaskparser import use_args
from app import server
import rng

@server.route("/api/rng/beta")
@use_args({'a': Arg(float, default=1.0),
           'b': Arg(float, default=1.0),
           'size': Arg(int, default=1)
           })
def beta(args):
    result = {
        'result' : rng.beta.generate(args).tolist()
    }
    return jsonify(**result)
