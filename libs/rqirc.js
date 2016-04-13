var config  = require('config');
var util    = require('util');
var log     = require('logule').init(module, 'rqirc');

// Setup our mqtt connection
var Mqtt   = require('./mqtt.js');
var mqtt   = new Mqtt(config.mqtt);


// Setup our irc connection
var Irc     = require('./irc.js');
var irc     = new Irc(config.irc);

require('../irc_modules/common.js')(irc, mqtt);
log.info(config);

function validateData(doc){
  // Check if sender of message is also receaver
  if ( doc.sender === config.rq.sender ) { throw 'Sender is me'; }

  // Check if data items exists and are strings
  if ( typeof doc.data.message !== 'string' ) { throw 'message not valid'; }
  if ( typeof doc.data.isaction !== 'boolean' ) { throw 'isaction not valid'; }
  if ( typeof doc.data.channel !== 'string' ) { throw 'channel not valid'; }

  return true;
}

mqtt.mqevent.on('ml256/*/temp0/temp', function(payload){
  var msg = util.format('Temp in %s is %s', this.event, payload.temperature);
  try {
    irc.debugSend(msg);
  }
  catch (error) {
    log.error("%s",error);
  }
});

