var feedparser = require('feedparser');
var URL = {
    Github : "https://github.com/sharadmv.atom"
}
var init = function(app){
    feedparser.parseFile(URL.Github)
        .on('article', function(article) {
            console.log(article.title);
        });
    var interface = {
        github : function(callback) {
        }
    }
    return interface;
}
module.exports = init;
