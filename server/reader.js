var util = require('./util');
var model = require('./model');
var fs = require('fs');
var postdir = "./posts/";

var TAG = "READ";
var LOG = util.log(TAG);

var postmeta = JSON.parse(fs.readFileSync('posts.json').toString('ascii'));
var posts = [];
LOG.d("Reading posts json");
for (var i in postmeta) {
  var meta = postmeta[i];
  var content = fs.readFileSync(postdir+meta.file).toString('ascii');
  var post = new model.Post(parseInt(i), Date.parse(meta.date), meta.title, content);
  posts.push(post);
}
posts.sort(function(a, b) {
  return a.date < b.date;
});
var methods = {
  get : function(id) {
    return posts[id];
  },
  all : function() {
    return posts;
  },
  contains : function(id) {
    return id < posts.length;
  }
}
module.exports = methods;
