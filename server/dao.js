var mongo = require('mongodb');
var BSON = mongo.BSONPure;
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://sharadmv:sharad@linus.mongohq.com:10002/iamawesome')
db.bind('posts');

var init = function(app) {
  var interface = {
    post : {
      all : function(callback) {
        db.posts.find().toArray(function(err, result) {
          if (err) {
          } else {
            callback(result);
          }
        });
      },
      get : function(id, callback) {
        if (typeof(id) == "string") {
          id = BSON.ObjectID(id);
        }
        db.posts.find({ _id : id }).toArray(function(err, result) {
          if (err) {
          } else {
            if (result.length > 0) {
              console.log(typeof(result[0]._id));
              callback(result[0]);
            } else {
              callback(null);
            }
          }
        });
      },
      save : function(post, callback) {
        db.posts.insert(post);
      }
    }
  }
  return interface;
}
module.exports = init;
