var request = require("request");
var log = require('logule').init(module, 'redqueen');

function Redqueen(cfg) {
  this.config   = cfg;
}

Redqueen.prototype.send = function(type, destination, data) {
  var options = { method: 'POST',
    url: this.config.url,
    headers: { 'content-type': 'application/json' },
    body:
      { type: type,
        key: this.config.key,
        destination: destination,
        data: data
      },
    json: true };

  request(options, function (error, response, body) {
    if (error){
      log.error(error);
    }
    log.info(body);
  });
};

// return constructor
module.exports = Redqueen;
