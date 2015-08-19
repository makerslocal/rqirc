var log  = require('logule').init(module, 'echo.js');
module.exports = function(irc, redqueen) {
  irc.rqevent.on('alert', function(msg){
    log.info('%s %s', msg.reply, msg.text);
    var data = {text: msg.text, nolight: false, sender: msg.nick, nosound: false};
    redqueen.send('command', 'bigsign', data);
    irc.send(msg.reply, 'Alerting sign!', false);
  });
};
