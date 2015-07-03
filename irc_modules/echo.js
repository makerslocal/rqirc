var log  = require('logule').init(module, 'echo');
module.exports = function(irc) {
  irc.rqevent.on('echo', function(msg){
    log.info('%j', msg);
    irc.send(msg.to, msg.text, false);
  });
};
