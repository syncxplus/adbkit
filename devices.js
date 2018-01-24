require('./lib/utils')
  .getAdbClient()
  .listDevices()
  .then(function (devices) {
    devices.forEach(function (device, i) {
      console.log(i, ":", device);
    });
  }).then(function () {
    process.exit(0);
});
