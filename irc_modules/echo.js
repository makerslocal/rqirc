var util = require('util');
var log = require('logule').init(module, 'echo.js');
var validator = require('is-my-json-valid');

// Define our json-schema
var validate = validator({
  type: 'object',
  properties: {
    command: {type: 'string', required: true},
    channel: {type: 'string', required: true},
    nick: {type: 'string', required: true},
    message: {type: 'string', required: true}
  }
});

module.exports = function(irc, mqtt) {
  log.info('module loaded');
  // subscribe to mqtt topic
  mqtt.subscribe('ml256/irc/+/command/echo');

  // Uses EventEmitter2 for events, can use wildcards.
  mqtt.mqevent.on('ml256/irc/*/command/echo', function(data) {
    irc.debugSend(util.format('%s %j', this.event, data));

    // use json-schema to validate mqtt data
    if (validate(data)) {
      log.info(data);
      irc.send(data.channel, data.message, false);
    } else {
      log.error('json not vaild');
    }
  });
};
