var request = require("request");
var log  = require('logule').init(module, 'echo.js');
module.exports = function(irc, couch) {
  irc.rqevent.on('alert', function(msg){
    log.info('%s %s', msg.reply, msg.text);
    irc.send(msg.reply, msg.text, false);

    var options = { method: 'POST',
  url: 'https://crump.space/rq-dev/api/v1.0/messages',
  headers: { 'content-type': 'application/json' },
  body:
   { type: 'command',
     key: 'lasdjfalfjaslfj',
     destination: 'bigsign',
     data: {text: msg.text, nolight: false, sender: msg.nick, nosound: false}  },
  json: true };

 request(options, function (error, response, body) {
  if (error) throw new Error(error);
 
  console.log(body);
});

  });
};
