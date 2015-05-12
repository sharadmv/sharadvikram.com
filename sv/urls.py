from app import server

@server.route("/")
def index():
    return server.send_static_file('index.html')
