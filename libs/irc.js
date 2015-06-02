var config        = GLOBAL.config;
var log           = require('logule').init(module, 'irc');
var irc           = require('irc');

function Irc(){
  var client = new irc.Client(config.irc.server, config.irc.nick, {
        channels: config.irc.channels,
  });
  return client;

}

module.exports = (function() {
  var instance;
  if (typeof instance === 'undefined') {
    instance = new Irc();
  }
  return instance;
}());
