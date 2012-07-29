var init = function(app) {
  var interface = {
    dao : {
      Post : function(title, content) {
        this.title = title;
        this.content = content;
        this.created = (new Date()).getTime();
      }
    }
  }
  return interface;
}
module.exports = init;
