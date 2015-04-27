var express = require('express')
  , api = require('./api');

var initialize = function(app) {
  apiRouter = api.initialize();

  app.use('/api', apiRouter);
}

exports.initialize = initialize;
