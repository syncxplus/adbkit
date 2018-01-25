//start api server
var port = process.env.PUBLIC_PORT || 80;
require('./api').listen(port);
console.log('Start to listening', port);
