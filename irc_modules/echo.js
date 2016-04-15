var log  = require('logule').init(module, 'echo.js');
module.exports = function(irc, mqtt) {
  mqtt.mqevent.on('ml256/irc/*/command/echo', function(msg){
    log.info(msg);
    irc.send(msg.channel, msg.message, false);
  });
};
