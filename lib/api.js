var http = require('http');
var express = require('express');

var utils = require('./utils');
var transport = require('./server');

var servers = {};

var api = express();

api.set('strict routing', false);
api.set('case sensitive routing', true);
api.set('trust proxy', true);

api.get('/info', function (req, res) {
  utils.getAdbClient()
    .listDevices()
    .then(function (deivces) {
      var data = [];
      deivces.forEach(function (device) {
        data.push(device.id);
      });
      res.json({error: 0, devices: data});
      res.end();
    })
    .catch(function (reason) {
      console.log(utils.time(), reason);
      res.json({error: -1, message: reason});
      res.end();
    });
});

api.get('/start/:serial/:rentKey/:port', function(req, res) {
  var serial = req.params.serial;
  var rentKey = req.params.rentKey;
  var port = req.params.port;
  console.log(utils.time(), serial, 'request to start', rentKey, port);
  utils.getAdbClient()
    .listDevices()
    .then(function (deivces) {
      var ok = false;
      deivces.forEach(function (device) {
        if (device.id === serial) {
          ok = true;
          return ok;
        }
      });
      return ok ? Promise.resolve() : Promise.reject('device not found!');
    })
    .then(function () {
      var server = servers[serial];
      return !!server ? Promise.resolve(server) : transport.run(serial, port, rentKey);
    })
    .then(function (server) {
      servers[serial] = server;
      res.json({error: 0});
      res.end();
    })
    .catch(function (reason) {
      console.log(utils.time(), serial, 'start failure', reason);
      res.json({error: -1, message: reason});
      res.end();
    });
});

api.get('/stop/:serial', function(req, res) {
  var serial = req.params.serial;
  console.log(utils.time(), serial, 'request to stop');
  var server = servers[serial];
  if (!!server) {
    server.end().close();
  }
  delete servers[serial];
  res.json({error: 0});
  res.end();
});

var unsupported = {
  error: -1,
  message: 'Unsupported Request'
};

api.get('*', function (req, res) {
  res.json(unsupported);
  res.end();
});

api.post('*', function (req, res) {
  res.json(unsupported);
  res.end();
});

module.exports = http.createServer(api);
