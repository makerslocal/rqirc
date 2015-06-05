var util = require('util');
var log  = require('logule').init(module, 'irc');
var irc  = require('irc');

// return constructor
module.exports = Irc;

function Irc(cfg) {
  this.client = new irc.Client(cfg.server, cfg.nick, cfg.opts);
  this.colors = irc.colors;

  this.client.addListener('join', function (channel, nick, message) {
    log.info('Connected - %s - %s', channel, nick);
  });

}

Irc.prototype.send = function(channel, msg) {
  try {
    log.info('%s - %s', channel, msg);
    this.client.say(channel, this.colors.wrap('light_red',msg));
  }
  catch (error) {
      log.error("send - %s",error);
  }
};

Irc.prototype.debugSend = function(doc) {
  try {
    var msg = util.format('[%s]->[%s] : %j', doc.sender, doc.destination, doc.data);
    log.info(msg);
    this.client.say('##rqtest', msg);
  }
  catch (error) {
      log.error("debugSend - %s",error);
  }
};
