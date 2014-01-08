var util = require('./util');
var model = require('./model');
var fs = require('fs');
var postdir = "./projects/";

var TAG = "READ";
var LOG = util.log(TAG);

var postmeta = JSON.parse(fs.readFileSync('projects.json').toString('ascii'));
var methods = {
  all : function() {
    return postmeta;
  },
}
module.exports = methods;
