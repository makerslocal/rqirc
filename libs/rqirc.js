var config  = require('config');
var util    = require('util');
var log     = require('logule').init(module, 'rqirc');
log.info(config);

// Setup our mqtt connection
var Mqtt   = require('./mqtt.js');
var mqtt   = new Mqtt(config.mqtt);

// Setup our irc connection
var Irc     = require('./irc.js');
var irc     = new Irc(config.irc);

// Setup reading rss feed
var Rss     = require('./rss.js');
var rss     = new Irc(mqtt, config.rss);

require('../irc_modules/common.js')(irc, mqtt);

// send all irc commands to mqtt
irc.rqevent.on('*', function(msg){

  // strip invalid topc chars and create topic
  var channel = msg.channel.replace(/[#+]/g, "");
  var command = msg.command.replace(/[#+]/g, "");
  var topic = util.format('ml256/irc/%s/command/%s', channel, command);

  // convert msg json into string
  var message = JSON.stringify(msg);

  // send mqtt message
  mqtt.send(topic, message);
});
