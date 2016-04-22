var util      = require('util');
var log       = require('logule').init(module, 'cascade.js');
var validator = require('is-my-json-valid');

// example mesage:
//   ml256/cascade/withdrawal {"user": "tylercrumpton", "amount": 0.50}

// Define our json-schema
var validate = validator({
  type : 'object',
  properties : {
    user    : {type: 'string', required: true},
    ammount : {type: 'number', required: true},
  }
});

module.exports = function(irc, mqtt) {
  // subscribe to mqtt topic
  mqtt.subscribe('ml256/cascade/withdrawal');

  mqtt.mqevent.on('ml256/cascade/withdrawal', function(data){
    // use json-schema to validate mqtt data
    if (!validate(data)){
      log.error('not vaild');
    }
    else {
      // create and send message
      var message = util.format('KACHUNK!');
      log.info(message);
      irc.send('#makerslocal', message, false);
    }
  });
};
