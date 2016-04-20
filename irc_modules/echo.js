var log       = require('logule').init(module, 'echo.js');
var validator = require('is-my-json-valid');

// Define our json-schema
var validate = validator({
  type : 'object',
  properties : {
    command : {type: 'string', required: true},
    channel : {type: 'string', required: true},
    nick    : {type: 'string', required: true},
    message : {type: 'string', required: true},
  }
});

module.exports = function(irc, mqtt) {
  // subscribe to mqtt topic
  mqtt.subscribe('ml256/irc/+/command/echo');

  // Uses EventEmitter2 for events, can use wildcards.
  mqtt.mqevent.on('ml256/irc/*/command/echo', function(data){

    // use json-schema to validate mqtt data
    if (!validate(data)){
      log.error('json not vaild');
    }
    else {
      log.info(data);
      irc.send(data.channel, data.message, false);
    }
  });
};
