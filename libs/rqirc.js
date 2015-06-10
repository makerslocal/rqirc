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
  log.info("change: %j", change);
  // received doc change, now get doc
  couch.db.get(change.id, function (err, doc) {
    if ( err ) { log.error("%j", err); return; }
    log.info("doc id: %s", doc._id);
    log.info("doc: %j", doc);
      // Send all messages to ##rqtest
      irc.debugSend(doc);

      //validateData(doc);
      if ( doc.destination === config.rq.sender ){
        log.info("Sending irc - [to: %s]",doc.data.channel);
        irc.send(doc.data.channel, doc.data.message);
      }
  });
});

couch.feed.on('error', function(er) {
    log.error(er);
});

couch.feed.follow();
