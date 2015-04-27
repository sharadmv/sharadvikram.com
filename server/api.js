var express = require('express');

var initialize = function() {
  var router = express.Router();

  router.use(function(req, res, next) {
    // Optional middleware
  });

  router.get('/project', function(req, res) {
    res.send("Hello World!");
  })
  return router;
}

exports.initialize = initialize;
