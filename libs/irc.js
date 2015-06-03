var config        = GLOBAL.config;
var log           = require('logule').init(module, 'irc');
var irc           = require('irc');

var Irc = function(){
  this.colors = irc.colors;
  this.client = new irc.Client(config.irc.server, config.irc.nick, {
        channels: config.irc.channels,
  });

};

module.exports = new Irc();
