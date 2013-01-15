var init = function(app) {
  var path = require('path');
  var express = require('express');
  var application = express();

  //Setting up important variables
  var TAG = app.constants.tag.SERVER;
  var servers = {
    "production" : {
      port : process.env.PORT || 80
    },
    "test" : {
      port : 1337
    },
    "beta" : {
      port : 8080
    }
  }

  //Configuring server
  application.configure(function() {
    application.set('views', __dirname + '/views');
    application.set('view engine', 'jade');
    application.use(express.favicon());
    application.use(express.logger('dev'));
    application.use(express.bodyParser());
    application.use(express.methodOverride());
    application.use(express.cookieParser('this is my secret'));
    application.use(express.cookieSession());
    application.use(application.router);
    application.use(express.static('public/'));
    application.enable("jsonp callback");
  });

  application.get('/', function(req, res) {
    res.render('index');
  });

  application.get('/blog', function(req, res) {
    res.render('blog');
  });

  application.get('/blog/:id', function(req, res) {
    res.render('blog');
  });

  application.get('/partials/:loc/:name', function(req, res) {
    res.render('partials/'+req.params.loc+"/"+req.params.name);
  });

  application.get('/api/post/', function(req, res) {
    app.model.Post.find({}, function(err, posts) {
      if (err) {
        res.json(404);
      } else {
        res.json(posts);
      }
    });
  });
  application.get('/api/post/:id', function(req, res) {
    app.model.Post.findOne({_id : req.params.id }, function(err, post) {
      if (err) {
        res.json(404);
      } else {
        res.json(post.toJSON());
      }
    });
  });

  application.post('/api/post/', function(req, res) {
    var newPost = new app.model.Post({
      title : req.param('title'),
      author : "Sharad",
      content : req.param('content'),
      comments : [],
      hidden : req.param('hidden')
    });
    newPost.save(function(err, post) {
      if (err) {
        res.send(500);
      } else {
        res.json(post.toJSON());
      }
    });
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
