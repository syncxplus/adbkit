//start api server
var api = require('./api')
api.listen(process.env.PUBLIC_PORT || 8080);
console.log('Server is running');
