var request = require("request");
var log = require('logule').init(module, 'redqueen');

function Redqueen(cfg) {
  this.config   = cfg;
}

Redqueen.prototype.send = function(destination, data, type) {
  var options = { method: 'POST',
    url: this.config.rq.url,
    headers: { 'content-type': 'application/json' },
    body:
      { type: type,
        key: this.config.rq.key,
        destination: destination,
        data: data
      },
    json: true };

  request(options, function (error, response, body) {
  if (error){
    log.error(error);
  }
  log.info(response);
  });


};

// return constructor
module.exports = Redqueen;
