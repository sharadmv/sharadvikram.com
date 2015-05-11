from app import server

@server.route("/")
def foo():
    return "Hello"
