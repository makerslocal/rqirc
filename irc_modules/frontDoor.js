var util      = require('util');
var log       = require('logule').init(module, 'frontDoor.js');

module.exports = function(irc, mqtt) {
  log.info('module loaded');
  // subscribe to mqtt topic
  mqtt.subscribe('ml256/door/front/+');

  // Uses EventEmitter2 for events, can use wildcards.
  mqtt.mqevent.on('ml256/door/front/*', function(data){

    irc.debugSend(util.format('%s %j', this.event, data));

  });
};
