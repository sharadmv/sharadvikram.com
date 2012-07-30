var mongo = require('mongodb'); 
var BSON = mongo.BSONPure;
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://sharadmv:sharad@flame.mongohq.com:27041/iamawesome')
db.bind('posts');

var init = function(app) {
  var interface = {
    post : {
      all : function(callback) {
        var post = new app.model.dao.Post("SUP", "HEY");
        post.id="1";
        callback([post]);
        /*
        db.posts.find().toArray(function(err, result) {
          if (err) {
          } else {
            callback(result);
          }
        });
        */
      },
      get : function(id, callback) {
        var post = new app.model.dao.Post("SUP", "HEY");
        post.id="1";
        callback(post);
        /*
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
        */
      },
      save : function(post, callback) {
        db.posts.insert(post);
      }
    }
  }
  return interface;
}
module.exports = init;
