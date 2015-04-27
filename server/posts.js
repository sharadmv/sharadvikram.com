var util = require('./util');
var model = require('./model');
var fs = require('fs');
var postdir = "./posts/";

var TAG = "READ";
var LOG = util.log(TAG);

var postmeta = JSON.parse(fs.readFileSync('posts.json').toString('ascii'));
var postSorted = [];
var posts = {};
for (var i in postmeta) {
  var meta = postmeta[i];
  var content = fs.readFileSync(postdir+meta.file).toString('ascii');
  var id = parseInt(i);
  var post = new model.Post(i, Date.parse(meta.date), meta.title, content);
  postSorted.push(post);
  posts[id] = post;
}
postSorted.sort(function(a, b) {
  return a.date < b.date;
});
var methods = {
  get : function(id) {
    return posts[id];
  },
  all : function() {
    return postSorted;
  },
  contains : function(id) {
    return id < postSorted.length;
  }
}

module.exports = methods;
