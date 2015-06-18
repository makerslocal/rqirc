var config  = require('config');
var util    = require('util');
var log     = require('logule').init(module, 'rqirc');

// Setup our couchdb connection
var Couch   = require('./couch.js');
var couch   = new Couch(config.couch);

// Setup our irc connection
var Irc     = require('./irc.js');
var irc     = new Irc(config.irc);


function validateData(doc){
  // Check if sender of message is also receaver
  if ( doc.sender === config.rq.sender ) { throw 'Sender is me'; }

  // Check if data items exists and are strings
  if ( typeof doc.data.message !== 'string' ) { throw 'message not valid'; }
  if ( typeof doc.data.isaction !== 'boolean' ) { throw 'isaction not valid'; }
  if ( typeof doc.data.channel !== 'string' ) { throw 'channel not valid'; }

  // Only allow connected channels
  if ( config.irc.opts.channels.indexOf(doc.data.channel) === -1) { throw "Channel not in whitelist"; }

  return true;
}


// Watch couch for a doc changee
couch.feed.on('change', function (change) {
  var doc = change.doc;
  log.info("change: %j", change);

  // Send all messages to ##rqtest
  irc.debugSend(doc);

  try {
    validateData(doc);
    log.info("Sending irc - [to: %s]",doc.data.channel);
    irc.send(doc.data.channel, doc.data.message, doc.data.isaction);
  }
  catch (error) {
    log.error("%s",error);
  }

});

couch.feed.on('error', function(er) {
    log.error(er);
});

irc.client.addListener('join', function (channel, nick) {
  log.info('Connected - %s - %s', channel, nick);
  couch.feed.follow();
});


