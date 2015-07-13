var log  = require('logule').init(module, 'echo.js');
module.exports = function(irc, couch) {
  irc.rqevent.on('echo', function(msg){
    log.info('%s %s', msg.reply, msg.text);
    irc.send(msg.reply, msg.text, false);
  });
};
