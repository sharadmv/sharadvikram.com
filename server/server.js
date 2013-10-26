var express = require('express');
var posts = require('./reader');
var app = express();

app.use(express.static(__dirname + '/../public'));
app.configure(function(){
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/../views');
});

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/blog/:id', function(req, res) {
    var id = req.params.id;
    if (posts.contains(id)) {
      res.render('post', { post : posts.get(id) });
    } else {
      res.send(404);
    }
});

app.get('/blog', function(req, res) {
    res.render('blog', { posts : posts.all() });
});

app.get('/about', function(req, res) {
    res.render('about', { });
});

var server = {
    listen : function(port) {
        app.listen(port);
    }
}
module.exports = server;
