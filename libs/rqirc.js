var config  = GLOBAL.config;
var util    = require('util');
var log     = require('logule').init(module, 'rqirc');

// Setup our couchdb connection
var Couch   = require('./couch.js');
var couch   = new Couch(config.couch);

// Setup our irc connection
var Irc     = require('./irc.js');
var irc     = new Irc(config.irc);

// Watch couch for a doc changee
couch.feed.on('change', function (change) {
  var doc = change.doc;
  log.info("change: %j", change);
    // Send all messages to ##rqtest
    irc.debugSend(doc);

    //validateData(doc);
    if ( doc.destination === config.rq.sender ){
      log.info("Sending irc - [to: %s]",doc.data.channel);
      if ( doc.data.isaction === true ){
        irc.sendAction(doc.data.channel, doc.data.message);
      }
      else {
        irc.send(doc.data.channel, doc.data.message);
      }
    }
});

couch.feed.on('error', function(er) {
    log.error(er);
});

couch.feed.follow();
