var util = require('./util');
var server = require('./server');

var TAG = "APP";
var LOG = util.log(TAG);

var port = process.env.PORT || 1337;

server.listen(port);
LOG.i("Server listening on", port);
