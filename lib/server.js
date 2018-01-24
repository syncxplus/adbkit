var Promise = require('bluebird');

var utils = require('./utils');

var adbClient = utils.getAdbClient();

Server = (function () {
  function Server() {}

  Server.prototype.run = function(serial, port, rentKey) {
    console.log(utils.time(), serial, 'starting ...');

    var defer = Promise.defer();

    var server = adbClient.createTcpUsbBridge(serial, {
      rentKey: rentKey
    });

    server.on('listening', function() {
      console.log(utils.time(), serial, 'listening', port);
      defer.resolve(server);
    });

    server.on('connection', function(conn) {
      console.log(utils.time(), serial, 'new connection', conn.remoteAddress);
      conn.on('error', console.error);
      conn.on('end', console.log);
      conn.on('userActivity', function (packet) {
        console.log(utils.time(), serial, packet.toString());
      });
    });

    server.on('close', function () {
      console.log(utils.time(), serial, 'close event');
    });

    server.on('error', function (error) {
      console.log(utils.time(), serial, 'error event', error);
    });

    server.listen(port);

    return defer.promise.timeout(5000);
  }

  return Server;
})();

module.exports = new Server;
