var util      = require('util');
var log       = require('logule').init(module, 'alert.js');
var validator = require('is-my-json-valid');

// example:
//  ml256/bigsign/alert {"source": "hfuller", "message": "test one two three"}

// Define our json-schema
var validate = validator({
  type : 'object',
  properties : {
    source   : {type: 'string', required: true},
    message  : {type: 'string', required: true},
  }
});

module.exports = function(irc, mqtt) {
  log.info('module loaded');
  // subscribe to mqtt topic
  mqtt.subscribe('ml256/bigsign/alert');

  mqtt.mqevent.on('ml256/bigsign/alert', function(data){

    irc.debugSend(util.format('%s %j', this.event, data));

    // use json-schema to validate mqtt data
    if (!validate(data)){
      log.error('not vaild');
    }
    else {
      // create and send message
      var message = util.format('alerting: %s - %s', data.message, data.source);
      log.info(message);
      irc.send('#makerslocal', message, false);
    }
  });
};
