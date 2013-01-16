/**
 * Entry point for application
 */

//Setting up scope
var app = this;

//Requiring modules
var constants = require('./constants.js')(app);
app.constants = constants;

var model = require('./model.js')(app);
app.model = model;

var server = require('./server.js')(app);
app.server = server;

var rss = require('./rss.js')(app);
app.rss = rss;

//Setting up important variables
var namespace = {
  "test" : app.constants.namespace.TEST,
  "beta" : app.constants.namespace.BETA,
}

//Setting up global variables
app.namespace = "test";
if (process.argv[2]) {
  var ns = process.argv[2];
  if (namespace[ns]) {
    app.namespace = ns;
  }
}

//Setting up global functions
app.log = function(tag, message) {
  console.log("["+tag+"]: ", message);
}

//Initializing modules
server.listen();
