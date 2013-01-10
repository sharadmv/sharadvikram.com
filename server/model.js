var mongoose = require('mongoose');
mongoose.connect('mongodb://sharadmv:sharad@linus.mongohq.com:10002/iamawesome', {});
var init = function(app) {
  var schema = {
    post : new mongoose.Schema({
      title : String,
      author : String,
      content : String,
      comments: [{ body : String, date : Date }],
      date: { type : Date, default : Date.now },
      hidden: Boolean,
    })
  }
  var interface = {
    Post : mongoose.model("Post", schema.post)
  }
  return interface;
}
module.exports = init;
