var init = function(app) {
  var express = require('express');
  var application = express.createServer();

  //Setting up important variables
  var TAG = app.constants.tag.SERVER;
  var servers = {
    "test" : {
      port : 1337 
    },
    "beta" : {
      port : 8080
    }
  }

  //Configuring server
  application.set('view engine', 'ejs');
  application.enable("jsonp callback");
  application.get('/', function(req, res) {
    app.log(TAG, "GET");
    res.render('index', { page : 'index' });
  });

  application.get('/', function(req, res) {
    app.log(TAG, "GET");
    res.render('index', { page : 'index' });
  });

  //Exposing interface
  var interface = {
    listen : function() {
      var port = servers[app.namespace].port;
      application.listen(servers[app.namespace].port);
      app.log(TAG, "Server listening on "+port);
    }
  }

  return interface;
}
module.exports = init;

