var log  = require('logule').init(module, 'echo');
module.exports = function(irc) {
  irc.rqevent.on('echo', function(msg){
    if ( msg.pm ){
      irc.send(msg.nick, msg.text, false);
    }
    else{
      irc.send(msg.to, msg.text, false);
    }
  });
};
