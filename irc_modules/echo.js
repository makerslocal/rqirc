var log       = require('logule').init(module, 'echo.js');
var validator = require('is-my-json-valid');

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
  mqtt.subscribe('ml256/irc/+/command/echo');
  mqtt.mqevent.on('ml256/irc/*/command/echo', function(data){
    if (!validate(data)){
      log.error('json not vaild');
    }
    else {
      log.info(data);
      irc.send(data.channel, data.message, false);
    }
  });
};
