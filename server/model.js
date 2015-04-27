var model = {
    Post : function(id, date, title, content) {
      this.id = id;
      this.date = date;
      this.title = title;
      this.content = content;
    }
}
module.exports = model;
