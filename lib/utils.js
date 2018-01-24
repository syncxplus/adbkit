var adbkit = require('adbkit');

Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

Utils = (function () {
  function Utils() {}

  Utils.prototype.getAdbClient = function () {
    var options = {
      host: process.env.ADB_SERVER_HOST || '127.0.0.1',
      port: process.env.ADB_SERVER_PORT || 5037
    };
    return adbkit.createClient(options);
  };

  Utils.prototype.time = function () {
    return '[' + new Date().format('yyyy-MM-dd hh:mm:ss') + ']';
  };

  return Utils;
})();

module.exports = new Utils;
