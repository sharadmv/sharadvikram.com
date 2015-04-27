var express = require('express')
  , posts = require('./posts')
  , projects = require('./projects')
  , util = require('./util')

var initialize = function() {
  var router = express.Router();

  router.use(function(req, res, next) {
    util.log.d(req.METHOD, req.url);
  });

  router.get('/project', function(req, res) {
    res.send("Hello World!");
  })
  return router;
}

exports.initialize = initialize;
