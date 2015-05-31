var config  = GLOBAL.config;
var log     = require('logule').init(module, 'rqmailer');
var db      = require('./couch.js');
var irc     = require('./irc.js');


irc.addListener('message', function (from, to, message) {
      console.log(from + ' => ' + to + ': ' + message);
      irc.say('##rqtest', "I'm a bot!");
});

