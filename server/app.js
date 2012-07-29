/**
 * Entry point for application
 */

//Setting up scope
var app = this;

//Requiring modules
var constants = require('./constants.js')(app);
app.constants = constants;

var server = require('./server.js')(app);
app.server = server;

var dao = require('./dao.js')(app);
app.dao = dao;
//Setting up important variables

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
