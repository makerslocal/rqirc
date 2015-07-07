var log  = require('logule').init(module, 'echo');
module.exports = function(irc) {
  irc.rqevent.on('echo', function(msg){
    irc.send(msg.reply, msg.text, false);
  });
};
