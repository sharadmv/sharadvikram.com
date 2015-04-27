var express = require('express')
  , routes = require('./routes')
  , bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes.initialize(app);

var server = {
  listen: function(port) {
    app.listen(port);
    console.log("Server listening on", port);
  }
}

module.exports = server
